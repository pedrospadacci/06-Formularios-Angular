import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemplateForm } from './template-form/template-form';
import { DataForm } from './data-form/data-form';
import { TempFormPrat } from './temp-form-prat/temp-form-prat';
import { DataFormPrat02 } from './data-form-prat-02/data-form-prat-02';
import { DataFormPrat } from './data-form-prat/data-form-prat';
import { DataFormPrat03 } from './data-form-prat-03/data-form-prat-03';

const routes: Routes = [
  {path:'template', component:TemplateForm},
  {path:'tempFormPrat',component:TempFormPrat},
  {path:'data', component:DataForm},
  {path:'dataPrat', component:DataFormPrat},
  {path:'dataPrat02', component:DataFormPrat02},
  {path:'dataPrat03', component:DataFormPrat03},
  {path:'', redirectTo:'data', pathMatch:'full'}
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
