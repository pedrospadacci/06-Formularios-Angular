import { Component } from '@angular/core';

@Component({
  selector: 'app-temp-form-prat',
  standalone: false,
  templateUrl: './temp-form-prat.html',
  styleUrl: './temp-form-prat.css',
})
export class TempFormPrat {
  pessoa:any = {
    nome:'',
    email:''
  }

  aoSubmeter(form:any){
    console.log(form)
    console.log(this.pessoa)
  }
}
