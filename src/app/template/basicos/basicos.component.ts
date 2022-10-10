import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styles: [
  ]
})
export class BasicosComponent implements OnInit {

  @ViewChild('miformulario') miformulario!: NgForm;

  constructor() { }

  ngOnInit(): void {
  }

  nombreValido(): boolean {
    return this.miformulario?.controls['producto']?.status == "INVALID" && this.miformulario?.controls['producto']?.touched;
  }

  precioValido(): boolean {
    return this.miformulario?.controls['precio']?.touched && this.miformulario?.controls['precio']?.value < 0;
  }

  guardar(){
    console.log( this.miformulario.controls );

    this.miformulario.resetForm({
      producto: '',
      precio: 0,
      existencias: 0
    });
  }

}
