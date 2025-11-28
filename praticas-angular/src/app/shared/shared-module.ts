import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampoControl } from './campo-control/campo-control';
import { FormDebug } from './form-debug/form-debug';
import { FormDebugPratica } from './form-debug-pratica/form-debug-pratica';
import { DropDownService } from './servcices/DropDown.service';



@NgModule({
  declarations: [
    CampoControl,
    FormDebug,
    FormDebugPratica
  ],
  imports: [
    CommonModule
  ],
  exports:[
    CampoControl,
    FormDebug,
    FormDebugPratica
  ],
  providers:[
    DropDownService
  ]
})
export class SharedModule { }
