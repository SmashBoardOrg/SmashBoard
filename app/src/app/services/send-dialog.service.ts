import { Injectable } from '@angular/core';

/*Dialog*/
import { MdDialog } from '@angular/material';
import { SendDialogComponent } from '../components/dialogs/send-dialog.component';


@Injectable()
export class SendDialogService{
    constructor(public dialog: MdDialog){}

    openConfirmSend(tx, to, amount, gas, total, action, token?, tokenAmount? ){
        return this.dialog.open(SendDialogComponent, {
            width: '660px',
            height: '400px',
            data:{
                tx: tx,
                to: to,
                amount: amount,
                gas: gas,
                total: total,
                action: action,
                token : token,
                tokenAmount : tokenAmount
            },
        });
    }

    openConfirmDeploy(tx, amount, gas, total, action, contract){
        return this.dialog.open(SendDialogComponent, {
            width: '660px',
            height: '400px',
            data:{
                tx: tx,
                amount: amount,
                gas: gas,
                total: total,
                action: action,
                contract : contract
            },
        });
    }

    openConfirmAlternativeSend(tx, to, amount, gas, total, action, seedOptions ){
        return this.dialog.open(SendDialogComponent, {
            width: '660px',
            height: '400px',
            data:{
                tx: tx,
                to: to,
                amount: amount,
                gas: gas,
                total: total,
                action: action,
                seedOptions: seedOptions
            },
        });
    }
}