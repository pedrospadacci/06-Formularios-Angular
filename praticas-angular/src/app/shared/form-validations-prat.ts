import { AbstractControl, FormArray, FormControl, FormGroup } from "@angular/forms";

export class FormValidationsPrat{
  static campoMinCheckbox(min = 1){
    let validator = (formArray:AbstractControl)=>{
      if(formArray instanceof FormArray){
        let totalChecked = formArray.controls.map(v=>v.value).
        reduce((total, atual)=>atual?total + atual: total,0)
        return totalChecked >= min? null:{required:true}
      }
      throw new Error('form Array is not an instance of FormArray')
    }
    return validator
  }

  static cepValidator(control:FormControl){
    let cep = control.value
    if(!cep){
      return null
    }
    let validaCep = /^[0-9]{8}$/
    return validaCep.test(cep)?null:{cepInvalido:true}
  }

  static emailIgual(outroCampo:string){
    let validador = (formControl:FormControl)=>{
      if(outroCampo == null){
        throw new Error('Necessário informar um campo')
      }

      if(!formControl.root || !(<FormGroup>formControl.root).controls){
        return null
      }

      let field = (<FormGroup>formControl.root).get(outroCampo)

      if(!field){
        throw new Error('É necessário informar um campo válido!')
      }

      if(field.value !== formControl.value){
        return {igualA: outroCampo}
      }
      return null
    }
    return validador
  }

  static pegarMensagemErro(nomeCampo:string, nomeValidador:string, valorValidador?:any, controle?: FormControl){
    let tamanho = controle?.value.length?? 0
    let config:{[key:string]:any} = {
      'required':`${nomeCampo} é obrigatório`,
      'minlength':`${nomeCampo} precisa ter no mínimo ${valorValidador.requiredLength}, quantidade atual: ${tamanho}`,
      'maxlength':`${nomeCampo} precisa ter no máximo ${valorValidador.requiredLength}, quantidade atual: ${tamanho}`,
      'igualA': 'Email já cadastrado'
    }
  }
}
