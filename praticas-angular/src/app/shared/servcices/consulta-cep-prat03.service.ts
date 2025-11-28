import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultaCepPrat03Service {

constructor(private http: HttpClient) { }
  searchPostalCode(postalCode:string){
    postalCode = postalCode.replace(/\D/g,'')
    if(postalCode !== ''){
      let validatePostal = /^[0-9]{8}$/

      if(validatePostal.test(postalCode)){
        this.http.get(`https://viacep.com.br/ws/${postalCode}/json/`)
      }
    }
    return of({})
  }
}
