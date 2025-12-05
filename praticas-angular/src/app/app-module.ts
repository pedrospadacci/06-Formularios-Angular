import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';


import { FormsModule } from '@angular/forms';
import { TemplateFormModule } from './template-form/template-form-module';
import { TempFormPratModule } from './temp-form-prat/temp-form-prat-module';
import { DataFormModule } from './data-form/data-form-module';
import { DataFormPratModule } from './data-form-prat/data-form-prat-module';
import { SharedModule } from './shared/shared-module';
import { DataFormPrat02Module } from './data-form-prat-02/data-form-prat-02-module';
import { DataFormPrat03Module } from './data-form-prat-03/data-form-prat-03-module';



@NgModule({
  declarations: [
    App,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    TemplateFormModule,
    TempFormPratModule,
    DataFormModule,
    DataFormPratModule,
    SharedModule,
    DataFormPrat02Module,
    DataFormPrat03Module
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
