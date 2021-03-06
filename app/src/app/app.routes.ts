
import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { WalletComponent } from './components/wallet/wallet.component'
import { GlobalPage } from './components/wallet/global/global.page'
import { SendPage } from './components/wallet/send/send.page'
import { ReceivePage } from './components/wallet/receive/receive.page'
import { StripePage } from "./components/wallet/stripe/stripe.component";
import { WsettingsPage } from './components/wallet/wsettings/wsettings.page'

import { TokensComponent } from './components/tokens/tokens.component'
import { GeneralPage } from './components/tokens/general/general.page'
import { SendTokensPage } from './components/tokens/send/send-tokens.page'
import { AddTokenPage } from './components/tokens/add/add.page'

import { SettingsComponent } from './components/settings/settings.component'

const routes: Routes = [
  { path: 'wallet', component: WalletComponent,
    children: [
      { path: '', redirectTo: 'global', pathMatch: 'full' },
      { path: 'global', component: GlobalPage },
      { path: 'send', component: SendPage },
      { path: 'receive', component: ReceivePage },
      { path: 'stripe', component: StripePage },
      { path: 'wsettings', component: WsettingsPage }
    ]
  },
  { path: 'tokens', component: TokensComponent,
    children: [
      { path: '', redirectTo: 'general', pathMatch: 'full' },
      { path: 'general', component: GeneralPage },
      { path: 'send-tokens', component: SendTokensPage },
      { path: 'add', component: AddTokenPage },
    ]
  },
  { path: 'general-settings', component: SettingsComponent },
  { path: '', redirectTo: '/wallet/global', pathMatch: 'full' },
  { path: '**', redirectTo: '/wallet/global', pathMatch: 'full' },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
