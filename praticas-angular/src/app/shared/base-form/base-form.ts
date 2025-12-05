import { Component, Directive } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Directive()
export abstract class BaseForm {
  formulario!:FormGroup

   abstract submit():any

  onSubmit(){
    if (this.formulario.valid){
      this.submit()
    }else{
      console.log('Form Inválido!')
      this.verificaValidaForms(this.formulario)
    }
  }

   verificaValidaForms(formGrupo: FormGroup | FormArray){
    Object.keys(formGrupo.controls).forEach(campo=>{
      let controle = formGrupo.get(campo)
      controle?.markAllAsTouched()
        controle?.markAllAsDirty()
      if(controle instanceof FormGroup || controle instanceof FormArray){
        this.verificaValidaForms(controle)
      }
    })
  }

  resetar() {
    this.formulario.reset()
  }

  verificaCampo(campo: string) {
    return !this.formulario.get(campo)?.valid && (this.formulario.get(campo)?.touched || this.formulario.get(campo)?.dirty)
  }

  aplicarCssErro(campo: string) {
    return {
      'has-error': this.verificaCampo(campo),
      'has-invalid': this.verificaCampo(campo)
    }
  }

  verificaEmailInvalido() {
    let campoEmail = this.formulario.get('email')
    if (campoEmail?.errors) {
      return campoEmail.errors['email'] && campoEmail.touched
    }
  }

  verificaRequired(campo: string) {
    return this.formulario.get(campo)?.hasError('required') && (this.formulario.get(campo)?.touched || this.formulario.get(campo)?.dirty)
  }

  getCampo(campo:string){
    return this.formulario.get(campo)
  }
}
