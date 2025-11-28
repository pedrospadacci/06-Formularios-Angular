import { Component, Input } from '@angular/core';

@Component({
  selector: 'form-debug-pratica',
  standalone: false,
  templateUrl: './form-debug-pratica.html',
  styleUrl: './form-debug-pratica.css',
})
export class FormDebugPratica {
  @Input() formPrat:any
}
