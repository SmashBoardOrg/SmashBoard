import { Component, Inject  } from '@angular/core';
import { Router } from '@angular/router';

import { DialogService } from '../../../services/dialog.service';
import { MdDialogRef } from '@angular/material';
import { MD_DIALOG_DATA } from '@angular/material';
var CryptoJS = require("crypto-js");

@Component({
  selector: 'detail-dialog',
  templateUrl: './detail-dialog.component.html'
})
export class DetailDialogComponent{
    protected base_url = "https://api.stripe.com";
    protected stripe;
    public submited;
    
    public error = ""; 
    public title = "";
    public message = "";
   
    private sk;
    private key = "U2FsdGVkX19HJnlGkvEj1mHJE6jd5bzCYBwY4GuOaVlZ1XNdGfh/V181vZlM88JjBxtMpjpa5IiOK96sZEcT8g==";
    private mail = "noopur@smashboard.org";

  constructor(private router: Router, public dialogService: DialogService, @Inject(MD_DIALOG_DATA) public data: any, public dialogRef: MdDialogRef<DetailDialogComponent>) { 
    let bytes = CryptoJS.AES.decrypt(this.key.toString(), this.mail);
    this.sk = bytes.toString(CryptoJS.enc.Utf8);
    this.stripe = require("stripe")(this.sk);
  }
   
  async send(){
    this.dialogRef.close();
    console.log("amount", this.data.data.amount);
    let am = this.data.data.amount * 100;
    let amount_fixed = am.toFixed(0);
    console.log("x", amount_fixed);
    
    let loading = this.dialogService.openLoadingDialog();
        var tok = await this.stripe.tokens.create({
          card: {
            "number": this.data.data.number,
            "exp_month": this.data.data.exp_month,
            "exp_year": this.data.data.exp_year,
            "cvc": this.data.data.cvc
          }
        },async(err, token)=> {
          console.log("token??",token);
          console.log("error?",err);
          if(!err){
            console.log("entras en el if !err?");
            const charge = await this.stripe.charges.create({
              amount: amount_fixed,
              currency: 'eur',
              source: token.id,
              receipt_email: this.mail,
            });
            console.log("charge inside?????",charge);

            const retrieve =  await this.stripe.charges.retrieve(
              charge.id,
              async (err, charge) =>{

                if(!err){
                    let date = new Date();
                    console.log("date?",date);
                    let day = date.getDate();
                    let month = date.getMonth();
                    let year = date.getFullYear();
                    let thisDate = day+"-"+month+"-"+year;
                    let hours = date.getHours();
                    let minutes = date.getMinutes();

                    let min;
                    if(minutes < 10){
                      min = "0"+minutes;
                    }else{
                      min = minutes;
                    }
                    let time = hours +":"+min;
                    let obj = {
                      number: this.data.data.showNumber,
                      type: this.data.data.type,
                      amount: this.data.data.amount,
                      currency: "eur",
                      charge_id: charge.id,
                      date: thisDate,
                      time:time
                    }
                    if(!localStorage.getItem("donations")){
                      let donation = new Array();
                      donation[0] = obj;
                      localStorage.setItem("donations", JSON.stringify(obj));
                    }else{
                      let arr = new Array();
                      let storage = JSON.parse(localStorage.getItem("donations"));
                      console.log("storage", storage);
                      console.log("obj",obj);
                      console.log("storage.length?", storage.length);
                      if(storage.length == null){
                        arr.push(storage);
                      }else{
                        for (let i = 0; i < storage.length; i++) {
                          arr.push(storage[i]);
                        }
                      }
                      
                      arr.push(obj);
                      console.log("arr before safe",arr);
                      
                      localStorage.setItem("donations",JSON.stringify(arr));
                    }
                    this.title = "Your donation has been sent";
                    this.message = "Your transaction ID is " + charge.id;
                    let error = "";
                    loading.close();
                    let dialogRef = this.dialogService.openErrorDialog(this.title, this.message, error, this.data.action);
                    dialogRef.afterClosed().subscribe(result=>{
                      if(typeof(result)!= 'undefined' || result != ''){
                        this.router.navigate(['/wallet/history']);
                      }
                    })
                }else{
                  loading.close();
                  this.openDialogWhenError(err.message);
                }
              });
          }else{
            this.openDialogWhenError(err.message)
            console.log("error ",err);
          }
        });
  }

  closeDialog(){
    this.dialogRef.close();
    
  }

  openDialogWhenError(errorMessage){
    this.title = "Unable to complete transaction";
    this.message = "Something went wrong"
    this.error = errorMessage;
    this.dialogRef.close();
    this.dialogService.openErrorDialog(this.title,this.message,this.error);
  }
}
