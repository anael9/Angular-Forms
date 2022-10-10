import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidatorService } from 'src/app/shared/validator/email-validator.service';
import { ValidatorService } from 'src/app/shared/validator/validator.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html'
})
export class RegistroComponent implements OnInit {

  
  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [ Validators.required, Validators.pattern( this.vs.nombreApellidoPattern ) ]],
    email: ['', [ Validators.required, Validators.pattern( this.vs.emailPattern ) ], [ this.ev ]],
    username: ['', [ Validators.required, this.vs.noPuedeSerStrider ]],
    password: ['', [ Validators.required, Validators.minLength(6) ]],
    password2: ['', [ Validators.required ]],
  },{
    validators: [ this.vs.camposIguales( 'password', 'password2' )]
  })

  constructor( private fb: FormBuilder, private vs: ValidatorService, private ev: EmailValidatorService ) { }

  ngOnInit(): void {
    this.miFormulario.reset({
      nombre: 'Anael Hernandez',
      email: 'anaeltrabajo@gmail.com',
      username: 'Anael9'
    })
  }

  get emailErrorMsg(): string {
    const errors = this.miFormulario.get('email')?.errors;

    if ( errors?.['required'] ) {
      return 'Email es obligatorio.';
    } else if ( errors?.['pattern'] ) {
      return 'El valor ingresado no tiene formato de correo.';
    } else if( errors?.['emailTomado'] ){
      return 'El email ya existe'
    }

    return '';
  }

  campoNoValido( campo: string ){
    return this.miFormulario.get( campo )?.invalid && this.miFormulario.get( campo )?.touched;
  }

  emailRequired(){

  }

  submitFormulario(){
    this.miFormulario.markAllAsTouched();
  }
}
