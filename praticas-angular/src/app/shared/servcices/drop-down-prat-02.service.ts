import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EstadosBrPrat02 } from '../models/estados-br-prat-02';

@Injectable({
  providedIn: 'root'
})
export class DropDownPrat02Service {

constructor(private http: HttpClient) { }

getEstados(){
  return this.http.get<EstadosBrPrat02[]>('assets/dados/estadosbr.json')
}

getCargos(){
  return [
    {nome:'DBA',nivel:'Jr',desc:'DBA Jr'},
    {nome:'DBA',nivel:'Pl',desc:'DBA Pl'},
    {nome:'DBA',nivel:'Sr',desc:'DBA Sr'},
  ]
}

getTecnologias(){
  return [
    {nome:'cobol',descricao:'Cobol'},
    {nome:'basic',descricao:'Basic'},
    {nome:'pearl',descricao:'Pearl'},
    {nome:'ada',descricao:'Ada'},
    {nome:'pascal',descricao:'Pascal'},
  ]
}

getOpcao(){
  return[
    {valor:'s',desc:'Sim'},
    {valor:'n',desc:'Não'},
  ]
}

getFrameWorks(){
  return ['Angular','Sencha','React','Vue']
}

}
