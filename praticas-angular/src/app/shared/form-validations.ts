import { AbstractControl, FormArray, FormControl, FormGroup } from "@angular/forms"

export class FormValidations{
   static requiredMinCheckbox(min = 1){
    let validator = (formArray:AbstractControl)=>{
      if(formArray instanceof FormArray){
        let totalChecked = formArray.controls.map(
        (v=>v.value)
      ).reduce(
        (total, current)=> current? total + current: total,0
      )
      return totalChecked >= min?null:{required:true}
      }
      throw new Error('form Array is not an instance of FormArray')
    }
    return validator
  }

  static cepValidator(control: FormControl){
    let cep = control.value
    if(!cep){
      return null
    }
    let validaCep = /^[0-9]{8}$/
      return validaCep.test(cep)? null:{cepInvalido: true}
  }

  static equalsTo(otherField:string){
    const validator = (formControl:FormControl)=>{
      if(otherField == null){
        throw new Error('É necessário informar um campo')
      }

      if(!formControl.root || !(<FormGroup>formControl.root).controls){
        return null
      }

      let field = (<FormGroup>formControl.root).get(otherField)

      if(!field){
        throw new Error('Campo Inválido, é necessário informar um campo')
      }

      if(field.value !== formControl.value){
        return {equalsTo : otherField}
      }

      return null
    }
    return validator
  }

  static getErrorMsg(fieldName:string, validatorName: string, validatorValue?:any, control?:FormControl){
    let length = control?.value?.length ?? 0
    let config:{[key:string]:any} = {
      'required':`${fieldName} é obrigatório`,
      'minlength':`${fieldName} precisa ter no mínimo ${validatorValue.requiredLength}, quantidade atual: ${length}`,
      'maxlength':`${fieldName} precisa ter no máximo ${validatorValue.requiredLength}, quantidade atual: ${length}`,
      'cepInvalido':'Cep inválido',
      'emailInvalido':'Email já cadastrado',
      'equalsTo':'Campos não são iguais',
      'pattern':'Campo inválido'
    }
    return config[validatorName]
  }
}
