import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DropDownService } from '../shared/servcices/DropDown.service';
import { EstadoBr } from '../shared/models/estado-br';
import { ConsultaCepService } from '../shared/servcices/consulta-cep.service';
import { Observable } from 'rxjs';
import { Cargos } from '../shared/models/cargos';
import { Tecnologias } from '../shared/models/tecnologias';

@Component({
  selector: 'app-data-form',
  standalone: false,
  templateUrl: './data-form.html',
  styleUrl: './data-form.css',
})
export class DataForm {
  formulario!: FormGroup
  estados!: Observable<EstadoBr[]>
  cargos!:Cargos[]
  tecnologias!:Tecnologias[]
  newsletterOp!:any[]
  termos!:[null]

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private dropDownService:DropDownService,
    private cepService: ConsultaCepService
  ) { }

  ngOnInit() {

    this.estados = this.dropDownService.getEstados()
    this.cargos = this.dropDownService.getCargos(),
    this.tecnologias = this.dropDownService.getTecnologias()
    this.newsletterOp = this.dropDownService.getNewsLetter()
    //  this.dropDownService.getEstados().subscribe(
    //   (res:EstadoBr[])=>{
    //     this.estados = res
    //     console.log(this.estados)
    //   }
    // )

    //  this.formulario = new FormGroup({
    //    nome: new FormControl(null),
    //    email: new FormControl(null),
    //    endereco: new FormGroup({
    //     cep: new FormControl(null),
    //     rua: new FormControl(null),
    //     numero: new FormControl(null),
    //     complemento: new FormControl(null),
    //     bairro: new FormControl(null),
    //     cidade: new FormControl(null),
    //     estado: new FormControl(null)
    //    })
    // })

    this.formulario = this.formBuilder.group({
      nome: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      endereco: this.formBuilder.group({
        cep: [null, Validators.required],
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
      termos:[null, Validators.pattern('true')]
    })
  }

  onSubmit() {
    if (this.formulario.valid) {
      this.http.post('https://jsonplaceholder.typicode.com/posts', JSON.stringify(this.formulario.value)).subscribe(
        (dados: any) => {
          console.log(dados)
        }, (error: any) => alert('Erro ao enviar o formulário!'))
    }else{
      console.log('Form Inválido!')
      this.verificaValidaForms(this.formulario)
    }
  }

  verificaValidaForms(formGrupo: FormGroup){
    Object.keys(formGrupo.controls).forEach(campo=>{
      let controle = formGrupo.get(campo)
      controle?.markAllAsTouched()
    })
  }

  resetar() {
    this.formulario.reset()
  }

  verificaEmailInvalido() {
    let campoEmail = this.formulario.get('email')
    if (campoEmail?.errors) {
      return campoEmail.errors['email'] && campoEmail.touched
    }
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
        estado: dados.estado,
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
}
