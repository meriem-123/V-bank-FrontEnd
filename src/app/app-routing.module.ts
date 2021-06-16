import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountSummaryComponent } from './account/components/account-summary/account-summary.component';
import { TransferFormComponent } from './transfer/components/transfer-form/transfer-form.component';
import { LoginComponent } from './authentification/components/login/login.component';
import { TransferListComponent } from './transfer/components/transfer-list/transfer-list.component';
import { TransferDoneComponent } from './transfer/components/transfer-done/transfer-done.component';
import { RechargeFormComponent } from './recharge/components/recharge-form/recharge-form.component';
import { AuthGuardService } from './authentification/services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'overview',
    component: AccountSummaryComponent,
    //canActivate: [AuthGuardService],
  },
  {
    path: 'compte/:id/virementForm',
    component: TransferFormComponent,
    //canActivate: [AuthGuardService],
  },
  {
    path: 'compte/:id/virements',
    component: TransferListComponent,
    //canActivate: [AuthGuardService],
  },
  {
    path: 'virementEffectue/:id',
    component: TransferDoneComponent,
    //canActivate: [AuthGuardService],
  },
  {
    path: 'compte/:id/rechargeForm',
    component: RechargeFormComponent,
    //canActivate: [AuthGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
