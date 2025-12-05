import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampoControl } from './campo-control/campo-control';
import { FormDebug } from './form-debug/form-debug';
import { FormDebugPratica } from './form-debug-pratica/form-debug-pratica';
import { DropDownService } from './servcices/DropDown.service';
import { ErrorMsg } from './error-msg/error-msg';
import { InputField } from './input-field/input-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CampoControl,
    FormDebug,
    FormDebugPratica,
    ErrorMsg,
    InputField,


  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  exports:[
    CampoControl,
    FormDebug,
    FormDebugPratica,
    ErrorMsg,
    InputField,

  ],
  providers:[
    DropDownService
  ]
})
export class SharedModule { }
