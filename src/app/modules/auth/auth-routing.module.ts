import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './components/log-in/log-in.component';
import { RegisterGuard } from './guard/register.guard'

const routes: Routes = [
  {
    path: 'register',
    loadChildren: () => import('./components/register/register.module')
    .then(m => { return m.RegisterModule }),
    canLoad: [RegisterGuard]
  },
  {
    path: 'logout',
    loadChildren: () => import('./components/log-out/log-out.module')
    .then(m => { return m.LogOutModule })
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
