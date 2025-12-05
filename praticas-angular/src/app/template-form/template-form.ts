import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { map } from 'rxjs';

@Component({
  selector: 'app-template-form',
  standalone: false,
  templateUrl: './template-form.html',
  styleUrl: './template-form.css',
})
export class TemplateForm {

  pessoa:any = {
    email:'',
    nome:''
  }

  constructor(private http: HttpClient){}

  onSubmit(form:any){
    console.log(form)
    console.log(this.pessoa)

    this.http.post('https://httpbin.org/post', JSON.stringify(form.value))
    .pipe(map((res:any)=>res)).subscribe(
      (dados:any)=>console.log(dados)
    )
  }

  verificaValidTouched(campo:any){
    return !campo.valid && campo.touched
  }

  aplicarCssErro(campo:any){
    return{
      'has-error':this.verificaValidTouched(campo),
      'has-feedback':this.verificaValidTouched(campo)
    }
  }
  consultaCEP(cep:any, form:any){
       cep = cep.replace(/\D/g,'')

       //expressão regular para validar o CEP
       if(cep !==''){
        let validacep = /^[0-9]{8}$/

        if(validacep.test(cep)){
          this.http.get(`https://viacep.com.br/ws/${cep}/json/`).subscribe(dados=> 
            this.populaDados(dados, form)
          )
        }
       }
    }

    populaDados(dados:any, formulario:any){
      console.log(formulario)

      formulario.form.patchValue({
        endereco:{
          rua:dados.logradouro,
          cep:dados.cep,
          cidade:dados.localidade,
          estado:dados.estado,
          bairro:dados.bairro,
          complemento:dados.complemento
        }
      })
    }

    formReseta( formulario:any){
      formulario.form.patchValue({
        endereco:{
          rua:null,
          cidade:null,
          estado:null,
          bairro:null,
          complemento:null,
        }
      })
    }
}
