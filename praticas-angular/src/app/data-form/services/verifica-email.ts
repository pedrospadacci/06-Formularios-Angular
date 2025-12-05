import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VerificaEmail {

  constructor(private http: HttpClient){}

  verificarEmail(email:any){
    return this.http.get('assets/dados/verificarEmail.json').pipe(
      delay(2500),
      map((dados:any)=>dados.emails),
      tap(console.log),
      map((dados:any)=>dados.filter((v:any)=> v.email === email)),
      tap(console.log),
      map((dados:any[])=>dados.length > 0),
      tap(console.log)
    )
  }
}
