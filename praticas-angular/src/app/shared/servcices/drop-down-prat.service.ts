import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EstadosBrPrat } from '../models/estados-br-prat';

@Injectable({
  providedIn: 'root'
})
export class DropDownPratService {

constructor(private http: HttpClient) { }
  getEstados(){
    return this.http.get<EstadosBrPrat[]>('assets/dados/estadosbr.json')
  }

  getCargos(){
    return [
      {nome:'Analista',nivel:'Jr',desc:'Analista Jr'},
      {nome:'Analista',nivel:'Pleno',desc:'Analista Pleno'},
      {nome:'Analista',nivel:'Senior',desc:'Analista Senior'}
    ]
  }

  getTecnologias(){
    return[
      {nome:'java',descricao:'Java'},
      {nome:'javascript',descricao:'JavaScript'},
      {nome:'python',descricao:'Python'},
      {nome:'php',descricao:'PHP'},
      {nome:'golang',descricao:'GoLang'},
      {nome:'c++',descricao:'C++'},
      {nome:'c#',descricao:'C#'},
    ]
  }

  getNewsTeller(){
    return[
      {valor:'s',desc:'Sim'},
      {valor:'n',desc:'Não'},
    ]
  }

  getFrameWorks(){
    return ['React','Angular','Vue','Sencha']
  }
}
