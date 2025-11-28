import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateForm } from './template-form';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared-module';



@NgModule({
  declarations: [
    TemplateForm,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    SharedModule
  ]
})
export class TemplateFormModule { }
