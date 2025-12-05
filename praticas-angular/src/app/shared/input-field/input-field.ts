import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

const INPUT_FIELD_VALUE_ACESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() =>InputField),
  multi:true
}
@Component({
  selector: 'app-input-field',
  standalone: false,
  templateUrl: './input-field.html',
  styleUrl: './input-field.css',
  providers:[INPUT_FIELD_VALUE_ACESSOR]

})
export class InputField implements ControlValueAccessor{
@Input() classeCss!:any
@Input() id!:string
@Input() label!:string
@Input() type:string = 'text'
@Input() control!:FormControl
@Input() isReadOnly:boolean = false
@Input() mostraIconeErro:boolean = false

private innerValue:any



get value(){
  return this.innerValue
}

set value(v:any){
  if (v !== this.innerValue){
    this.innerValue = v
    this.onChangeCb(v)
  }
}


onChangeCb: (_:any)=> void = () =>{}
onTouchedCb: (_:any)=> void = () =>{}

writeValue(v: any): void {
  this.value = v
}

registerOnChange(fn: any): void {
 this.onChangeCb = fn
}

registerOnTouched(fn: any): void {
  this.onTouchedCb = fn
}

setDisabledState?(isDisabled: boolean): void {
  this.isReadOnly = isDisabled
}

}
