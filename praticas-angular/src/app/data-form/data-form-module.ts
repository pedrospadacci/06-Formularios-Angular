import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataForm } from './data-form';
import { FormDebug } from '../shared/form-debug/form-debug';
import { CampoControl } from '../shared/campo-control/campo-control';
import { SharedModule } from '../shared/shared-module';



@NgModule({
  declarations: [
    DataForm,
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class DataFormModule { }
