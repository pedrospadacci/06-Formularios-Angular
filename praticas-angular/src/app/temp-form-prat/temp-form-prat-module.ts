import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TempFormPrat } from './temp-form-prat';
import { FormsModule } from '@angular/forms';
import { FormDebugPratica } from '../shared/form-debug-pratica/form-debug-pratica';
import { SharedModule } from '../shared/shared-module';



@NgModule({
  declarations: [
    TempFormPrat
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule
  ],
  exports:[]
})
export class TempFormPratModule { }
