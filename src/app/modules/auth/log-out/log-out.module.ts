import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogOutComponent } from './log-out.component';
import { LogOutRoutingModule } from './log-out-routing.module';

@NgModule({
  declarations: [
    LogOutComponent
  ],
  imports: [
    CommonModule, LogOutRoutingModule
  ],
  exports: [
    LogOutComponent
  ]
})
export class LogOutModule { }
