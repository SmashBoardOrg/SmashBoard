
import { NgModule, CUSTOM_ELEMENTS_SCHEMA }  from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Http, HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdDialogModule } from '@angular/material';


/*Routes*/
import { AppRoutingModule } from './app.routes';


/*Components*/
import { MyApp } from './app.component';
import { NavComponent } from './components/navComponent/nav.component';
import { NetWorkComponent } from './components/network/network.component';

import { PaginatorComponent } from './components/paginator/paginator.component';

import { WalletComponent } from './components/wallet/wallet.component';
import { GlobalPage } from './components/wallet/global/global.page';
import { SendPage } from './components/wallet/send/send.page';
import { DropdownPrefixes } from './components/wallet/send/dropdown-prefixes.componenet';
import { ReceivePage } from './components/wallet/receive/receive.page';
import { ListComponent } from './components/wallet/global/list.component';
import { StripePage } from "./components/wallet/stripe/stripe.component";
import { WsettingsPage } from './components/wallet/wsettings/wsettings.page';

import { TokensComponent } from './components/tokens/tokens.component';
import { GeneralPage } from './components/tokens/general/general.page';
import { SendTokensPage } from './components/tokens/send/send-tokens.page';
import { AddTokenPage } from './components/tokens/add/add.page';

import { SettingsComponent } from './components/settings/settings.component';

/*Dialogs*/
import { SelectAccountDialogComponent } from './components/navComponent/selectAccount-dialog.component';
import { AddAccountDialogComponent } from './components/navComponent/addAccount-dialog.component';
import { NewAccountDialogComponent } from './components/navComponent/newAccount-dialog.component';
import { ImportAccountDialogComponent } from './components/navComponent/importAccount-dialog.component';
import { SendDialogComponent } from './components/dialogs/send-dialog.component';
import { NetworkDialogComponent } from "./components/dialogs/network-dialog.component";
import { DeleteComponent } from './components/wallet/wsettings/confirm-delete.component';
import { JSONDialogComponent } from './components/wallet/wsettings/json-dialog.component';
import { PrivateKeyDialogComponent } from './components/wallet/wsettings/privatekey-dialog.component';
import { ErrorDialogComponent } from './components/dialogs/error-dialog.component';
import { LoadingDialogComponent } from './components/dialogs/loading-dialog.component';
import { MessageDialogComponent } from './components/dialogs/message-dialog.component';
import { DeleteDialog } from './components/dialogs/confirm-delete.component';
import { GasDialogComponent } from './components/dialogs/gas-dialog.component';
import { ShowTxDialogComponent } from './components/dialogs/showTx-dialog.component';
import { ResendTxDialogComponent } from './components/dialogs/resendTx-dialog.component';
import { DetailDialogComponent } from "./components/wallet/stripe/detail-dialog.component";
import { DonationsDialogComponent } from "./components/wallet/stripe/donations-dialog.component";


/*Servicies*/
import { WalletService } from './services/wallet.service';
import { AccountService } from './services/account.service';
import { Web3 } from './services/web3.service';
import { DialogService } from './services/dialog.service';
import { SendDialogService } from './services/send-dialog.service';
import { TokenService } from './services/token.service';
import { ContractService } from './services/contract.service';
import { FormsService } from './services/forms.service';
import { EtherscanService } from './services/etherscan.service';

/*Pipes*/
import { ConverterPipe } from './pipes/converter.pipe';
import { SeparateWordsPipe } from './pipes/words.pipe';


/*Directives*/
import { CustomMinDirective } from './validators/min-validator.directive';
import { ValidateAddressDirective } from './validators/address-validator.directive';
import { InsuficientFundsDirective } from './validators/funds-validator.directive';


@NgModule({
  declarations: [
    MyApp,
    NavComponent,
    NetWorkComponent,
    WalletComponent,
    GlobalPage,
    SendPage,
    DropdownPrefixes,
    ReceivePage,
    StripePage,
    WsettingsPage,
    SettingsComponent,
    ConverterPipe,
    SeparateWordsPipe,
    SelectAccountDialogComponent,
    AddAccountDialogComponent,
    NewAccountDialogComponent,
    ImportAccountDialogComponent,
    SendDialogComponent,
    DetailDialogComponent,
    DonationsDialogComponent,
    DeleteComponent,
    ErrorDialogComponent,
    LoadingDialogComponent,
    JSONDialogComponent,
    PrivateKeyDialogComponent,
    NetworkDialogComponent,
    ListComponent,
    PaginatorComponent,
    TokensComponent,
    GeneralPage,
    SendTokensPage,
    AddTokenPage,
    MessageDialogComponent,
    GasDialogComponent,
    CustomMinDirective,
    ValidateAddressDirective,
    InsuficientFundsDirective,
    DeleteDialog,
    ShowTxDialogComponent,
    ResendTxDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MdDialogModule,
    AppRoutingModule
  ],
  exports: [
    MaterialModule,
    BrowserAnimationsModule,
  ],
  bootstrap: [MyApp],
  entryComponents: [
    MyApp,
    SelectAccountDialogComponent,
    AddAccountDialogComponent,
    NewAccountDialogComponent,
    ImportAccountDialogComponent,
    SendDialogComponent,
    DetailDialogComponent,
    DonationsDialogComponent,
    DeleteComponent,
    ErrorDialogComponent,
    LoadingDialogComponent,
    JSONDialogComponent,
    PrivateKeyDialogComponent,
    MessageDialogComponent,
    GasDialogComponent,
    DeleteDialog,
    ShowTxDialogComponent,
    ResendTxDialogComponent,
    NetworkDialogComponent
  ],
  providers: [
    WalletService,
    AccountService,
    Web3,
    DialogService,
    SendDialogService,
    TokenService,
    ContractService,
    FormsService,
    EtherscanService
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
