import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import {MdDialog} from '@angular/material';

import { LoadingDialogComponent } from './components/dialogs/loading-dialog.component';
import { Web3 } from './services/web3.service';
import { AccountService } from './services/account.service';
import { EtherscanService } from './services/etherscan.service';


@Component({
  selector: 'ion-app',
  templateUrl: './app.html',
})
export class MyApp implements OnInit {
  loadingD;
  interval;
  
  constructor(protected _account: AccountService, protected dialog: MdDialog, protected _web3: Web3, protected router : Router, protected _scan: EtherscanService) {
    
    if(this._scan.apikey==""){
      this.router.navigate(['/general-settings']);
    }  
  }
  async ngOnInit() {
    
    
  }

  
}
