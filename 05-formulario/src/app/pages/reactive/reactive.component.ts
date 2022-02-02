import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import {ValidacionesService} from "../../service/validaciones.service";

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styles: [
  ]
})
export class ReactiveComponent implements OnInit {

  forma!: FormGroup;



  constructor(private formBuilder:FormBuilder, private validadores:ValidacionesService) {



    this.crearFormulario();
    this.cargarDatosFormulario();
  }

  ngOnInit(): void {
  }
  crearFormulario(){

    this.forma = this.formBuilder.group
    ({
      nombre:['',[Validators.required, Validators.minLength(5)] ],
      apellido: ['',[Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$")]],
      pass1: [''],
      pass2: [''],
      usuario : ['', , this.validadores.existeUsuario],

      direccion: this.formBuilder.group
      ({
        distrito:['',Validators.required],
        ciudad:['',Validators.required]
      }),
      pasatiempos: this.formBuilder.array([])
    }, {
      validators:this.validadores.passwordsIguales('pass1', 'pass2')
    })

  }


  //es recursiva.
  guardar(grupo:FormGroup){

    if (grupo.invalid) {
      Object.values(grupo.controls).forEach(control => {
        if (control instanceof FormGroup)
          this.guardar(control)
        control.markAsTouched();
      })
      return;
    }
    console.log(this.forma);
    this.forma.reset();
  }




  validar(campo:any){
    campo=this.forma.get(campo);
    return !(campo.invalid && campo.touched)
  }


  cargarDatosFormulario()
  {
    this.forma.reset
    ({

      apellido: "",
      email: "",
      direccion:{distrito:"", ciudad:""},

    })
    pasatiempos:["comer", "dormir"].forEach(valor => this.pasatiempos.push(this.formBuilder.control(valor)))
  }

  get pasatiempos() {
    return this.forma.get('pasatiempos') as FormArray;
  }


  agregarPasatiempo() {
    this.pasatiempos.push(this.formBuilder.control('', Validators.required));
  }

  borrarPasatiempo(i: number) {
    this.pasatiempos.removeAt(i);
  }


  get pass2Valido() {

    const pass1 = this.forma.get('pass1')!.value
    const pass2 = this.forma.get('pass2')!.value
    return (pass1 == pass2) ? true : false;
  }


}
