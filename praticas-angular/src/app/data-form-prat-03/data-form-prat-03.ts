import { DropDownPrat03Service } from './../shared/servcices/drop-down-prat03.service';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConsultaCepPrat03Service } from '../shared/servcices/consulta-cep-prat03.service';
import { EstadosBrPrat03 } from '../shared/models/estados-br-prat03';
import { Observable } from 'rxjs';
import { CargosPrat03 } from '../shared/models/cargos-prat-03';
import { TecnologiasPrat03 } from '../shared/models/tecnologiasPrat03';

@Component({
  selector: 'app-data-form-prat-03',
  standalone: false,
  templateUrl: './data-form-prat-03.html',
  styleUrl: './data-form-prat-03.css',
})
export class DataFormPrat03 {
  formuPrat03!: FormGroup
  estados!:Observable<EstadosBrPrat03[]>
  cargos!:CargosPrat03[]
  tecnologias!:TecnologiasPrat03[]
  newsletterOptions!:any[]
  termos!:[null]
  frameworks!: any[]

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private dropDownServicePrat03:DropDownPrat03Service,
    private cepServicePrat03:ConsultaCepPrat03Service
  ){}

  ngOnInit(){
    this.estados = this.dropDownServicePrat03.getEstados()
    this.cargos = this.dropDownServicePrat03.getCargos()
    this.tecnologias = this.dropDownServicePrat03.getTecnologias()
    this.newsletterOptions = this.dropDownServicePrat03.getOpcoes()
    this.frameworks = this.dropDownServicePrat03.getFrameWorks()

    this.formuPrat03 = this.formBuilder.group({
      nome: [null, Validators.required],
      email: [null, [Validators.required,Validators.email]],
      endereco: this.formBuilder.group({
        cep: [null, Validators.required],
        rua: [null, Validators.required],
        numero: [null, Validators.required],
        bairro: [null, Validators.required],
        complemento: [null],
        cidade: [null, Validators.required],
        estado: [null, Validators.required]
      }),
      cargo: [null],
      tecnologias:[null],
      newsletter:['s', Validators.required],
      termos:[null, Validators.pattern('true')],
      frameworks:this.buildFrameworks()
    })
  }

  buildFrameworks(){
    let values = this.frameworks.map(v=> new FormControl(false))
    return this.formBuilder.array(values)
  }

  sendForm(){
    let valueSubmitted = Object.assign({}, this.formuPrat03.value)
    valueSubmitted = Object.assign(valueSubmitted,{
      frameworks: valueSubmitted.frameworks.map(
        (v:any,i:any)=> v? this.frameworks[i]:null
      ).filter(
        (v:any)=>v!==null
      )
    })
    console.log(valueSubmitted)
    if(this.formuPrat03.valid){
      this.http.post('https://jsonplaceholder.typicode.com/posts', JSON.stringify(this.formuPrat03.value)).subscribe(
        (datas:any)=>{
          console.log(datas)

        },(error:any)=>alert('Erro ao enviar o formulário!'))
    }else{
      console.log('Form Inválido!')
      this.checkValidForms(this.formuPrat03)
    }
  }

  checkValidForms(formGrupo: FormGroup){
    Object.keys(formGrupo.controls).forEach(campo=>{
      let controle = formGrupo.get(campo)
      controle?.markAllAsTouched()
    })
  }

  limparForm(){
    this.formuPrat03.reset()
  }

  checkInvalidEmail(){
    let emailField = this.formuPrat03.get('email')
    if (emailField?.errors){
      return emailField.errors['email'] && emailField.touched
    }
  }

  checkField(field: string){
    return !this.formuPrat03.get(field)?.valid && (this.formuPrat03.get(field)?.touched || this.formuPrat03.get(field)?.dirty)
  }

  searchPostalCode(){
    let postalCode = this.formuPrat03.get('endereco.cep')?.value

    if(postalCode != null && postalCode !== ''){
      this.cepServicePrat03.searchPostalCode(postalCode)?.subscribe(
        datas=> this.fillFields(datas)
      )
    }


  }

  applyCssError(field: string){
    return{
      'has-error':this.checkField(field),
      'has-invalid':this.checkField(field)
    }
  }

  fillFields(datas:any){
    this.formuPrat03.patchValue({
      endereco:{
        rua: datas.logradouro,
        cep: datas.cep,
        cidade: datas.localidade,
        estado: datas.estado,
        bairro: datas.bairro
      }
    })
  }

  setarCargo(){
    let cargo = {nome:'QA', nivel:'Sênior', desc:'QA Sênior'}
    this.formuPrat03.get('cargo')?.setValue(cargo)
  }

  compararCargos(cargo1:CargosPrat03, cargo2:CargosPrat03){
    return cargo1 && cargo2? (cargo1.nome === cargo2.nome && cargo1.nivel === cargo2.nivel):cargo1 === cargo2
  }

  setarTecnologias(){
    this.formuPrat03.get('tecnologias')?.setValue(['html','c','lisp'])
  }

  getFrameworksControl(){
    return this.formuPrat03.get('frameworks')? (<FormArray>this.formuPrat03.get('frameworks')).controls:null
  }
}
