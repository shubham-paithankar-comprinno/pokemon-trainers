import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './modules/auth/auth.component';
import { AuthGuard } from './modules/auth/guard/auth.guard';

const routes: Routes = [
  {
    path: 'catalogue',
    loadChildren: () => import('./modules/catalogue/catalogue.module')
    .then(m => { return m.CatalogueModule }),
    // canLoad: [AuthGuard]
  },
  {
    path: 'trainer',
    loadChildren: () => import('./modules/trainer/trainer.module')
    .then(m => { return m.TrainerModule })
  },
  {
    path: '',
    component: AuthComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
