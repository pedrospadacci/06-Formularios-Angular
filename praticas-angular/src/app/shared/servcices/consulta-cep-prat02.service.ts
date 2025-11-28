import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultaCepPrat02Service {

constructor(private http: HttpClient) { }
  checkPostalCode(postalCode: string){
    postalCode = postalCode.replace(/\D/g,'')
    if(postalCode !== ''){
      let validPostal = /^[0-9]{8}$/

      if(validPostal.test(postalCode)){
        this.http.get(`https://viacep.com.br/ws/${postalCode}/json/`)
      }
    }
    return of ({})
  }
}
