
import { VerificaEmail } from './services/verifica-email';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DropDownService } from '../shared/servcices/DropDown.service';
import { EstadoBr } from '../shared/models/estado-br';
import { ConsultaCepService } from '../shared/servcices/consulta-cep.service';
import { distinctUntilChanged, empty, map, Observable, switchMap, tap } from 'rxjs';
import { Cargos } from '../shared/models/cargos';
import { Tecnologias } from '../shared/models/tecnologias';
import { FormValidations } from '../shared/form-validations';
import { BaseForm } from '../shared/base-form/base-form';
import { CidadeBr } from '../shared/models/cidades-br';

@Component({
  selector: 'app-data-form',
  standalone: false,
  templateUrl: './data-form.html',
  styleUrl: './data-form.css',
})
export class DataForm extends BaseForm{
  //formulario!: FormGroup
  //estados!: Observable<EstadoBr[]>
  estados!:EstadoBr[]
  cargos!:Cargos[]
  tecnologias!:Tecnologias[]
  newsletterOp!:any[]
  termos!:[null]
  frameworks!:any[]
  cidades!:CidadeBr[]

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private dropDownService:DropDownService,
    private cepService: ConsultaCepService,
    private verificaEmail:VerificaEmail
  ) { super()}

  ngOnInit() {

    this.dropDownService.getEstados().subscribe(
      dados=>this.estados = dados
    )

    //this.estados = this.dropDownService.getEstados()
    this.cargos = this.dropDownService.getCargos(),
    this.tecnologias = this.dropDownService.getTecnologias()
    this.newsletterOp = this.dropDownService.getNewsLetter()
    this.frameworks = this.dropDownService.getFrameWorks()

    this.formulario = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      email: [null, [Validators.required, Validators.email],[this.validarEmail.bind(this)]],
      confirmarEmail: [null, [FormValidations.equalsTo('email')]],
      endereco: this.formBuilder.group({
        cep: [null, [Validators.required, FormValidations.cepValidator]],
        numero: [null, Validators.required],
        complemento: [null],
        rua: [null, Validators.required],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required]
      }),
      cargo: [null],
      tecnologias:[null],
      newsletter:['s', Validators.required],
      termos:[null, Validators.pattern('true')],
      frameworks:this.buildFrameWorks()
    })

    this.formulario.get('endereco.cep')?.statusChanges.pipe(
      distinctUntilChanged(),
      tap((value:any)=>console.log(`status do cep: ${value}`)),
      switchMap(status=> status === 'VALID'?
        this.cepService.consultaCep(this.formulario.get('endereco.cep')?.value):
        empty()
      )
    ).subscribe((dados:any)=>dados?this.populaDados(dados):{})

    this.formulario.get('endereco.estado')?.valueChanges
    .pipe(
      tap(estado=>console.log(`Estado selecionado: ${estado}`)),
      map(estado=> this.estados.filter(e => e.sigla === estado)),
      map(estados=>estados && estados.length > 0? estados[0].id:null),
      switchMap(estadoId=> this.dropDownService.getCidades(Number(estadoId))),
      tap(console.log),
    )
    .subscribe(
      cidades=>this.cidades = cidades
    )
    //this.dropDownService.getCidades(8).subscribe(console.log)
  }



  buildFrameWorks(){
    let values = this.frameworks.map(v=> new FormControl(false))
    return this.formBuilder.array(values, FormValidations.requiredMinCheckbox(2))
  }

  submit(){
  console.log(this.formulario)
    let valueSubmit = Object.assign({}, this.formulario.value)
    valueSubmit = Object.assign(valueSubmit,{
      frameworks: valueSubmit.frameworks
      .map((v:any, i:any)=> v? this.frameworks[i]: null)
      .filter((v:any) => v !== null)
    })
    console.log(valueSubmit)
    if (this.formulario.valid) {
      this.http.post('https://jsonplaceholder.typicode.com/posts', JSON.stringify(valueSubmit)).subscribe(
        (dados: any) => {
          console.log(dados)
        }, (error: any) => alert('Erro ao enviar o formulário!'))
    }
  }

  consultaCep(){
    let cep = this.formulario.get('endereco.cep')?.value

    if(cep != null && cep !== ''){
      this.cepService.consultaCep(cep)?.subscribe(
          dados=>this.populaDados(dados)
        )
    }
  }



  populaDados(dados: any) {
    this.formulario.patchValue({
      endereco: {
        rua: dados.logradouro,
        cep: dados.cep,
        cidade: dados.localidade,
        estado: dados.uf,
        bairro: dados.bairro,
        complemento: dados.complemento
      }
    })
  }

  setCargo(){
    let cargo = {nome: 'Dev', nivel:'Sr', desc:'Dev Sr'}
    this.formulario.get('cargo')?.setValue(cargo)
  }

  compararCargo(cargo1:Cargos, cargo2:Cargos){
    return cargo1 && cargo2? (cargo1.nome === cargo2.nome && cargo1.nivel === cargo2.nivel): cargo1 === cargo2
  }

  setTecnologia(){
    this.formulario.get('tecnologias')?.setValue(['java','php','golang'])
  }

  compararTecnologia(tecnologia1:Tecnologias, tecnologia2:Tecnologias){
    return tecnologia1 && tecnologia2? (tecnologia1.nome === tecnologia2.nome && tecnologia1.descricao === tecnologia2.descricao): tecnologia1 === tecnologia2
  }

  getFrameworksControl(){
    return this.formulario.get('frameworks')? (<FormArray>this.formulario.get('frameworks')).controls:null
  }

  validarEmail(formControl:FormControl){
    return this.verificaEmail.verificarEmail(formControl.value).
    pipe(map(emailExiste=> emailExiste? {emailInvalido: true}:null))
  }
}
