import { Component, Inject  } from '@angular/core'
import { Router } from '@angular/router'

import { DialogService } from '../../../services/dialog.service'
import { MdDialogRef } from '@angular/material';
import { MD_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'donations-dialog',
  templateUrl: './donations-dialog.component.html',
  styleUrls: ['./selectAccount.css']
})
export class DonationsDialogComponent{
  myDonations;
  donation;

  constructor(private router: Router, public dialogRef: MdDialogRef<DonationsDialogComponent>) {
    if(localStorage.getItem("donations")){
      this.myDonations = JSON.parse(localStorage.getItem("donations"));
      console.log("this.myDonations", this.myDonations);
      
    }
  }
  

  async send(){
    this.dialogRef.close();
    
  }
  changeSelected(donation){
    this.donation=donation;    
  }

  closeDialog(){
    this.dialogRef.close();
    
  }

}
