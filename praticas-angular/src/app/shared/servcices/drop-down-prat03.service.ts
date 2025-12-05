import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EstadosBrPrat03 } from '../models/estados-br-prat03';

@Injectable({
  providedIn: 'root'
})
export class DropDownPrat03Service {

constructor(private http: HttpClient) { }
  getEstados(){
    return this.http.get<EstadosBrPrat03[]>('assets/dados/estadosbr.json')
  }

  getCargos(){
    return [
      {nome:'QA',nivel:'Júnior',desc:'QA Júnior'},
      {nome:'QA',nivel:'Pleno',desc:'QA Pleno'},
      {nome:'QA',nivel:'Sênior',desc:'QA Sênior'},
    ]
  }

  getTecnologias(){
    return [
      {nome:'html',descricao:'HTML'},
      {nome:'css',descricao:'CSS'},
      {nome:'php',descricao:'PHP'},
      {nome:'c',descricao:'C'},
      {nome:'lisp',descricao:'LISP'},
    ]
  }

  getOpcoes(){
    return [
      {valor:'s',desc:'Sim'},
      {valor:'n',desc:'Não'}
    ]
  }

  getFrameWorks(){
    return ['React','Angular','Vue','Sencha']
  }
}
