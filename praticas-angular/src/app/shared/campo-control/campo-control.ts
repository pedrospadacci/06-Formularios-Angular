import { Component, Input } from '@angular/core';

@Component({
  selector: 'campo-control',
  standalone: false,
  templateUrl: './campo-control.html',
  styleUrl: './campo-control.css',
})
export class CampoControl {
 @Input() mostrarErro!:boolean
 @Input() mensagemErro!:string
}
