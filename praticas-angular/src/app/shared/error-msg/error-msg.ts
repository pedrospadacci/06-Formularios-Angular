import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormValidations } from '../form-validations';

@Component({
  selector: 'app-error-msg',
  standalone: false,
  templateUrl: './error-msg.html',
  styleUrl: './error-msg.css',
})
export class ErrorMsg {
  //@Input() mostrarErro!:boolean
  //@Input() mensagemErro!:string

  @Input()control!:FormControl
  @Input()label!:string

  get errorMessage(){
    for (const propertyName in this.control.errors){
      //console.log(propertyName)
      //console.log(this.control.errors)
      if(this.control.errors.hasOwnProperty(propertyName) && this.control.touched){
        // TODO
        return FormValidations.getErrorMsg(this.label,propertyName, this.control.errors[propertyName], this.control)
      }
    }
    return null
  }
}
