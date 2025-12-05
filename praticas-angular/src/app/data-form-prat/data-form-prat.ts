import { ConsultaCepPratService } from './../shared/servcices/consulta-cep-prat.service';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EstadosBrPrat } from '../shared/models/estados-br-prat';
import { DropDownPratService } from '../shared/servcices/drop-down-prat.service';
import { Observable } from 'rxjs';
import { CargosPrat } from '../shared/models/cargos-prat';
import { TecnologiasPrat } from '../shared/models/tecnologiasPrat';
import { FormValidationsPrat } from '../shared/form-validations-prat';

@Component({
  selector: 'app-data-form-prat',
  standalone: false,
  templateUrl: './data-form-prat.html',
  styleUrl: './data-form-prat.css',
})
export class DataFormPrat {

  formulario!: FormGroup
  estados!:Observable<EstadosBrPrat[]>
  cargos!:CargosPrat[]
  tecnologias!:TecnologiasPrat[]
  newsLetterOptions!:any[]
  termos!:[null]
  frameworks!:any[]

  constructor(
    private formBuilder:FormBuilder,
    private http:HttpClient,
    private cepServicePrat: ConsultaCepPratService,
    private dropDownServicePrat: DropDownPratService
    ){}

  ngOnInit(){
    this.estados = this.dropDownServicePrat.getEstados()
    this.cargos = this.dropDownServicePrat.getCargos()
    this.tecnologias = this.dropDownServicePrat.getTecnologias()
    this.newsLetterOptions = this.dropDownServicePrat.getNewsTeller()
    this.frameworks = this.dropDownServicePrat.getFrameWorks()

    this.formulario = this.formBuilder.group({
      nome: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      confirmaEmail: [null, [FormValidationsPrat.emailIgual('email')]],
      endereco: this.formBuilder.group({
        cep: [null, [Validators.required, FormValidationsPrat.cepValidator]],
        numero: [null, Validators.required],
        complemento: [null],
        rua: [null, Validators.required],
        bairro: [null, Validators.required],
        cidade:[null, Validators.required],
        estado:[null, Validators.required]
      }),
      cargo:[null],
      tecnologias:[null],
      newsletter:['s', Validators.required],
      termos:[null, Validators.pattern('true')],
      frameworks: this.buildFrameworks()
    })
  }

  buildFrameworks(){
    let valores = this.frameworks.map(v=>new FormControl(false))
    return this.formBuilder.array(valores, FormValidationsPrat.campoMinCheckbox(1))
  }

  enviarForm(){
    let valueSubmit = Object.assign({}, this.formulario.value)
    valueSubmit = Object.assign(valueSubmit, {
      frameworks: valueSubmit.frameworks.map(
        (v:any, i:any)=>v?this.frameworks[i]:null
      ).filter(
        (v:any)=> v !==null
      )
    })
    console.log(valueSubmit)
    if(this.formulario.valid){
      this.http.post('https://jsonplaceholder.typicode.com/posts', JSON.stringify(valueSubmit)).subscribe(
      (dados:any)=>{
        console.log(dados)
        // this.limparFormulario()
      },(erro:any)=>alert('Link não encontrado!')
    )
    }else{
      this.verificaValidaForm(this.formulario)
    }
  }

  verificaValidaForm(formGroup: FormGroup){
    let formValido = Object.keys(formGroup.controls)
    formValido.forEach(campo=>{
      let controle = formGroup.get(campo)
      controle?.markAllAsTouched()
    })
  }

  limparFormulario(){
    this.formulario.reset()
  }

  verificaEmail(){
    let campoEmail = this.formulario.get('email')
    if(campoEmail?.errors){
      return campoEmail.errors['email'] && campoEmail.touched
    }
  }

  verificarCampoCss(campo:string){
    return !this.formulario.get(campo)?.valid && (this.formulario.get(campo)?.touched || this.formulario.get(campo)?.dirty)
  }

  verificarRequired(campo:string){
    return this.formulario.get(campo)?.hasError('required') && (this.formulario.get(campo)?.touched || this.formulario.get(campo)?.dirty)
  }

  aplicarCampoCss(campo:string){
    return{
      'has-error':this.verificarCampoCss(campo),
      'has-invalid':this.verificarCampoCss(campo)
    }
  }

  pesquisaCEP(){
    let cep = this.formulario.get('endereco.cep')?.value

    if(cep !== '' && cep != null){
      this.cepServicePrat.pesquisaCep(cep)?.subscribe(
        dados=>this.preencherDados(dados)
      )
    }
  }

  preencherDados(dados:any){
    this.formulario.patchValue({
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

  setarCargo(){
    let cargo = {nome:'Analista',nivel:'Jr',desc:'Analista Jr'}
    return this.formulario.get('cargo')?.setValue(cargo)
  }

  compararCargo(cargo1:CargosPrat, cargo2:CargosPrat){
    return cargo1 && cargo2? (cargo1.nome === cargo2.nome && cargo1.nivel === cargo2.nivel):cargo1 === cargo2
  }

  setarTecnologia(){
    this.formulario.get('tecnologias')?.setValue(['c#','java','php','python','javascript'])
  }

  pegarControleFrameworks(){
    return this.formulario.get('frameworks')? (<FormArray>this.formulario.get('frameworks')).controls:null
  }
}
