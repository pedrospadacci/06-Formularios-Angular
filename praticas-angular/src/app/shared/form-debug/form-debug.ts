import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-form-debug',
  standalone: false,
  templateUrl: './form-debug.html',
  styleUrl: './form-debug.css',
})
export class FormDebug {
  @Input()form!:any
}
