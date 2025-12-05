import { EstadosBrPrat02 } from './../shared/models/estados-br-prat-02';
import { DropDownPrat02Service } from './../shared/servcices/drop-down-prat-02.service';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConsultaCepPrat02Service } from '../shared/servcices/consulta-cep-prat02.service';
import { Observable } from 'rxjs';
import { CargosPrat02 } from '../shared/models/cargos-prat-02';
import { TecnologiasPrat02 } from '../shared/models/tecnologiasPrat02';


@Component({
  selector: 'app-data-form-prat-02',
  standalone: false,
  templateUrl: './data-form-prat-02.html',
  styleUrl: './data-form-prat-02.css',
})
export class DataFormPrat02 {

  formuPrat!:FormGroup
  estadosBr!:Observable<EstadosBrPrat02[]>
  cargos!:CargosPrat02[]
  tecnologias!:TecnologiasPrat02[]
  newsLetterOpcoes!:any[]
  termos!:[null]
  frameworks!:any[]

  constructor(private formBuilder: FormBuilder,
               private http:HttpClient,
              private dropDownPrat02:DropDownPrat02Service,
              private cepServicePrat02:ConsultaCepPrat02Service){}

  ngOnInit(){
    this.estadosBr = this.dropDownPrat02.getEstados()
    this.cargos =  this.dropDownPrat02.getCargos()
    this.tecnologias = this.dropDownPrat02.getTecnologias()
    this.newsLetterOpcoes = this.dropDownPrat02.getOpcao()
    this.frameworks = this.dropDownPrat02.getFrameWorks()

    this.formuPrat = this.formBuilder.group({
      nome:[null, Validators.required],
      email:[null,[Validators.email, Validators.required]],
      endereco: this.formBuilder.group({
        cep: [null, [Validators.required, Validators.maxLength(8)]],
        numero:[null, Validators.required],
        rua:[null, Validators.required],
        bairro:[null, Validators.required],
        complemento:[null],
        cidade:[null, Validators.required],
        estado:[null, Validators.required]
      }),
      cargo:[null],
      tecnologias:[null],
      newsLetter:['s', Validators.required],
      termos:[null, Validators.pattern('true')],
      frameworks: this.contruirFrameWorks()
    })
  }

  contruirFrameWorks(){
    let values = this.frameworks.map(v=> new FormControl(false))
    return this.formBuilder.array(values)
  }

  enviarForm(){
    let valorSubmetido = Object.assign({},this.formuPrat.value)

    valorSubmetido = Object.assign(valorSubmetido,{
      frameworks: valorSubmetido.frameworks
      .map((v:any, i:any)=>v?this.frameworks[i]:null)
      .filter((v:any)=> v !== null)
    })

    console.log(valorSubmetido)

    if(this.formuPrat.valid){
      this.http.post('https://jsonplaceholder.typicode.com/posts',JSON.stringify(valorSubmetido)).subscribe(
      (dados:any)=>{
        console.log(dados)
        //this.limparFormulario()
      },(erro:any)=>alert('Requisição não realizada'))
    }else{
      this.checkValidField(this.formuPrat)
    }

  }

  checkValidField(campForm: FormGroup){
    let controlField = Object.keys(campForm.controls)
    controlField.forEach(field=>{
      let checkedField = campForm.get(field)
      checkedField?.markAllAsTouched()
    })
  }

  limparFormulario(){
    this.formuPrat.reset()
  }

  checkInvalidEmail(){
    let emailField = this.formuPrat.get('email')
    if(emailField?.errors){
      return emailField.errors['email'] && emailField.touched
    }
  }

  checkField(field:string){
    return !this.formuPrat.get(field)?.valid &&( this.formuPrat.get(field)?.touched || this.formuPrat.get(field)?.dirty)
  }

  applyCssError(field:string){
    return{
      'has-error':this.checkField(field),
      'has-invalid':this.checkField(field)
    }
  }

  fillPostalCode(){
    let postalCode = this.formuPrat.get('endereco.cep')?.value

    if(postalCode !== '' && postalCode != null){
     this.cepServicePrat02.checkPostalCode(postalCode)?.subscribe(
      datas=>this.fillData(datas)
     )
    }
  }

  fillData(datas:any){
    this.formuPrat.patchValue({
      endereco:{
        rua:datas.logradouro,
        complemento:datas.complemento,
        cep:datas.cep,
        cidade:datas.localidade,
        estado:datas.estado,
        bairro:datas.bairro
      }
    })
  }
  setarCargo(){
    let cargo = {nome:'DBA',nivel:'Pl',desc:'DBA Pl'}
    return this.formuPrat.get('cargo')?.setValue(cargo)
  }

  compararCargo(cargo1:CargosPrat02, cargo2:CargosPrat02){
    return cargo1 && cargo2? (cargo1.nome === cargo2.nome && cargo1.nivel === cargo2.nivel):cargo1 === cargo2
  }

  setarTecnologia(){
    this.formuPrat.get('tecnologias')?.setValue(['cobol','pearl','pascal'])
  }

  getFrameworksControl(){
    return this.formuPrat.get('frameworks')? (<FormArray>this.formuPrat.get('frameworks')).controls:null
  }
}
