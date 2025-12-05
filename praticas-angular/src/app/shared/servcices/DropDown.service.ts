
import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EstadoBr } from '../models/estado-br';
import { CidadeBr } from '../models/cidades-br';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DropDownService {

constructor(private http: HttpClient) { }
  getEstados(){
    return this.http.get<EstadoBr[]>('assets/dados/estadosbr.json')
  }

  getCidades(idEstado:number){
    return this.http.get<CidadeBr[]>('assets/dados/cidadesbr.json').pipe(
      map((cidades:CidadeBr[])=>cidades.filter(c=> c.estado == idEstado))
    )
  }

  getCargos(){
    return [
      {nome: 'Dev', nivel:'Jr', desc:'Dev Jr'},
      {nome: 'Dev', nivel:'Pl', desc:'Dev Pl'},
      {nome: 'Dev', nivel:'Sr', desc:'Dev Sr'}
    ]
  }

  getTecnologias(){
    return[
      {nome:'java',descricao:'Java'},
      {nome:'php',descricao:'PHP'},
      {nome:'golang',descricao:'GoLang'},
      {nome:'python',descricao:'Python'}
    ]
  }

  getNewsLetter(){
    return[
      {valor:'s', desc:'Sim'},
      {valor:'n', desc:'Não'},
    ]
  }

  getFrameWorks(){
    return ['Angular','React','Vue','Sencha']
  }
}
