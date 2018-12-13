import { Component, OnInit } from '@angular/core';
import { Http, HttpModule, Headers } from '@angular/http';

import { AccountService } from '../../../services/account.service';
import { Web3 } from '../../../services/web3.service';

import { MdDialog } from '@angular/material';
import { DialogService } from '../../../services/dialog.service'
import { DetailDialogComponent } from "./detail-dialog.component";
import { DonationsDialogComponent } from './donations-dialog.component';

import { Router, NavigationEnd } from '@angular/router';
import { NetworkDialogComponent} from "../../dialogs/network-dialog.component"

import { NG_VALIDATORS, Validator, AbstractControl, Validators,FormControl } from '@angular/forms'
var CryptoJS = require("crypto-js");

@Component({
  selector: 'stripe',
  templateUrl: './stripe.component.html',
  styleUrls: ['./stripe.css']
})

export class StripePage implements OnInit {
  
    public interval;
    public dialogRef;
    protected stripe;
    private token
    public submited;
    //private token;
    protected monthsControl;
    protected cardControl;
    protected yearControl;
    protected amountControl;
    //min amount 50 cents

    protected amount;
    protected cardNumber:string;
    protected card;
    protected month;
    protected year;
    protected cvc;

    protected minYear;
    
    protected detailDialog;

    protected title;
    protected message;
    protected error;
    protected myDonations = null;

    private sk;
    private key = "U2FsdGVkX19HJnlGkvEj1mHJE6jd5bzCYBwY4GuOaVlZ1XNdGfh/V181vZlM88JjBxtMpjpa5IiOK96sZEcT8g==";
    private mail = "noopur@smashboard.org";

    constructor(private dialog: MdDialog, private http: Http, public _web3: Web3,private _account: AccountService, public dialogService: DialogService, private router : Router) {
      
      let bytes = CryptoJS.AES.decrypt(this.key.toString(), this.mail);
      this.sk = bytes.toString(CryptoJS.enc.Utf8);
      this.stripe = require("stripe")(this.sk);

      if(localStorage.getItem("donations")){
        this.myDonations = true;
      }
    }

    async ngOnInit() {
      if(this._web3.network.chain != 1){
        Promise.resolve().then(() => { 
          this.dialogRef = this.dialog.open(NetworkDialogComponent, {
              width: '660px',
              height: '200px',
              disableClose: false
          });
            this.dialogRef.afterClosed().subscribe(async result=>{
              this.router.navigate(["/wallet/global"]);
          })
        });
      } else {
        let date = new Date;
        let num = date.getFullYear().toString();
        let year = num.substr(2,3);
        this.minYear = Number(year);
        
        this.monthsControl = new FormControl("", [Validators.max(12), Validators.min(1)]);
        this.yearControl = new FormControl("",[Validators.min(this.minYear)]);
        this.cardControl = new FormControl("", [Validators.maxLength(19),Validators.minLength(17)]);
        this.amountControl = new FormControl("",[Validators.min(0.5)]);
      }
    }

    formatCreditCardNumber(event: KeyboardEvent){
      const charCode = (event.which) ? event.which : event.keyCode;
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
      }else{
        if(this.cardNumber != null){
          if(this.cardNumber.length == 4){
            this.cardNumber = this.cardNumber + " ";
          }
          if(this.cardNumber.length == 9){
            this.cardNumber = this.cardNumber + " ";
          }
          if(this.cardNumber.length == 14){
            this.cardNumber = this.cardNumber + " ";
          }
          if(this.cardNumber.length == 19 || this.cardNumber.length > 19){
            let y = this.cardNumber.substr(0, 19);
            
            this.cardNumber = y;
            let tmp = this.cardNumber.split(" ");
            let tmpNumberStr = "";
            for (let i = 0; i < tmp.length; i++) {
              tmpNumberStr = tmpNumberStr + tmp[i];  
            }
            this.card = Number(tmpNumberStr)
          }
          return true;
        }
      }
    }
    
    async pay(){
      let tmp = this.cardNumber.split(" ");
      let tmpNumberStr = "";
      for (let i = 0; i < tmp.length; i++) {
        tmpNumberStr = tmpNumberStr + tmp[i];  
      }
      this.card = Number(tmpNumberStr)
      
      this.submited = true;
      let fixedAmount = this.amount.toFixed(2)
      var tok = await this.stripe.tokens.create({
        card: {
          "number": this.card,
          "exp_month": this.month,
          "exp_year": this.year,
          "cvc": this.cvc
        }
      },async(err, token)=> {
        if(!err){
          let obj = {
            number: this.card,
            exp_month: this.month,
            exp_year: this.year,
            cvc: this.cvc,
            type: token.card.brand,
            amount: fixedAmount,
            showNumber: this.cardNumber
          }
          this.detailDialog = this.dialog.open(DetailDialogComponent, {
            width: '660px',
            height: '300px',
            data: {
              data: obj
            }
          });
        }else{
          this.openDialogWhenError(err.message)
        }
        
      });
    }

    openDialogWhenError(errorMessage){
      this.title = "Unable to complete transaction";
      this.message = "Something went wrong"
      this.error = errorMessage;
      
      this.dialogService.openErrorDialog(this.title,this.message,this.error);
    }

    openDonationsDialog(){
      let donationsDialog = this.dialog.open(DonationsDialogComponent,{
        width: '660px',
        height: '400px',
        panelClass: 'dialog'
      })
    }
}   
