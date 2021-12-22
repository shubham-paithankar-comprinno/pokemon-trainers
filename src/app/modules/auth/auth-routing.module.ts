import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { LogInComponent } from './log-in/log-in.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'logout',
    loadChildren: () => import('./log-out/log-out.module')
    .then(m => { return m.LogOutModule })
  },
  {
    path: 'catalogue',
    loadChildren: () => import('../catalogue/catalogue.module')
    .then(m => { return m.CatalogueModule }),
    canLoad: [AuthGuard]
  },
  {
    path: '',
    component: LogInComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
