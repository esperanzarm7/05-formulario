import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import {ValidacionesService} from "../../service/validaciones.service";
import {MatDialog} from "@angular/material/dialog";
import {DialogoConfirmacionComponent} from "../../shared/dialogo-confirmacion/dialogo-confirmacion.component";
import {finalize} from "rxjs/operators";

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styles: [
  ]
})
export class ReactiveComponent implements OnInit {

  forma!: FormGroup;
  popup:boolean=false;

  fecha = new Date();
  fechaMinima = this.obteneFechaMinima() + "-01-01";
  fechaMaxima = this.obteneFechaMaxima() + "-01-01";
  cantidadCaracteres = 0;
  cantidadMayusculas = 0;
  cantidadEspeciales = 0;
  seguridad = 0;

  ojo1=false;
  valorOjo1=false;
  ojo2=false;
  valorOjo2=false;

  constructor(private formBuilder:FormBuilder, private validadores:ValidacionesService, public dialogo:MatDialog, ) {

    this.ojo1=true;
    this.ojo2=true;
    this.valorOjo1=true;
    this.valorOjo2=true;

    this.crearFormulario();
    this.cargarDatosFormulario();
  }

  ngOnInit(): void {
  }

  mostrarDialogo(grupo:FormGroup):any{

    console.log("entrada mostrar dialogo");
    this.dialogo
      .open(DialogoConfirmacionComponent,{
      data:'quiere guardar??'
    })
      .afterClosed().pipe(finalize(()=>this.guardar(grupo)))
      .subscribe((confirmado:boolean)=>{
        this.popup=confirmado;
      if(confirmado){
        console.log("entrada mostrar dialogo si")
      return confirmado;
      } else {
        console.log("entrada mostrar dialogo no")
        return confirmado;
      }
    })

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
      fecha:[''],
      color:[''],
      contrasena:[''],
      confirmarcontrasena:[''],
      direccion: this.formBuilder.group
      ({
        distrito:['',Validators.required],
        ciudad:['',Validators.required]
      }),
      pasatiempos: this.formBuilder.array([]),
      // lenguajes: this.formBuilder.array([])
    }, {
      validators:this.validadores.passwordsIguales('pass1', 'pass2')
    })

  }

  async cambioOjo1()
  {
    if(this.ojo1)
    {
      this.ojo1=false;
      this.valorOjo1=false;
    }else
    {
      this.ojo1=true;
      this.valorOjo1=true;
    }
  }
  async cambioOjo2()
  {
    if(this.ojo2)
    {
      this.ojo2=false;
      this.valorOjo2=false;
    }else
    {
      this.ojo2=true;
      this.valorOjo2=true;
    }
  }

  guardar(grupo:FormGroup) {

    if (this.popup) {
      if (grupo.invalid) {
        Object.values(grupo.controls).forEach(control => {
          if (control instanceof FormGroup)
            this.guardar(control)
          control.markAsTouched();
        })

        alert("no ha sido posible guardarlo")
        return;
      } else {

        console.log(grupo.value)
        this.forma.reset();
        alert("guardado")
      }
    }
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
    // lenguajes:["angular", "js","booststrap","php","css"].forEach(valor => this.lenguajes.push(this.formBuilder.control(valor)))
  }

  get pasatiempos() {
    return this.forma.get('pasatiempos') as FormArray;
  }
  // get lenguajes() {
  //   return this.forma.get('lenguajes') as FormArray;
  // }


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

  /**
   * Calculamos el límite mínimo de fecha a introducir, el usuario debe de ser mayor de edad
   */
  obteneFechaMinima() {
    return this.fecha.getFullYear() - 18;
  }

  /**
   * Calculamos el límite máximo de fecha a introducir, el usuario debe de ser menor a 100 años
   */
  obteneFechaMaxima() {
    return this.fecha.getFullYear() - 100;
  }

  resetForm(forma: FormGroup) {
    forma.reset();
  }

  contrasena(contrasena: any) {

    console.log(contrasena.target.value)
    console.log(this.seguridad)
    console.log("aa"+contrasena.target.value.length)
    let barra: any = document.getElementById("barra");
    let caracteresEspeciales = ["!", "#", "$", "%", "&", "'", "(", ")", "+", "-", "€", "@", "/", "¿", "?", "¡", "_", "<", ">"];
    let mayusculas = 0;
    let especial = 0;

    if (contrasena.target.value.length < this.cantidadCaracteres) {
      this.seguridad = this.seguridad - ((this.cantidadCaracteres - contrasena.target.value.length) * 3);
      console.log(this.cantidadCaracteres +"-"+ contrasena.target.value.length+"="+this.seguridad)
      let contrasenaMayusculas=contrasena.target.value.toUpperCase();
      for (let i = 0; i <= contrasena.target.value.length; i++) {
        for (let j = 0; j < contrasenaMayusculas.length; j++) {
          if (contrasena.target.value[i] == contrasenaMayusculas[j]) {
            mayusculas++;
          }
        }
      }
      if (mayusculas < this.cantidadMayusculas) {
        this.seguridad = this.seguridad - ((this.cantidadMayusculas - mayusculas) * 5);
      }
      for (let i = 0; i <= caracteresEspeciales.length; i++) {
        for (let j = 0; j < contrasena.target.value.length; j++) {
          if (contrasena.target.value[j] == caracteresEspeciales[i]) {
            especial++;
            if (especial < this.cantidadEspeciales) {
              this.seguridad = this.seguridad - ((this.cantidadEspeciales - especial) * 10);
            }
          }
        }
      }

    } else {
      this.cantidadCaracteres++;
      this.seguridad = this.seguridad + 3;

      if (contrasena.data == contrasena.data.toUpperCase()) {
        this.cantidadMayusculas++;
        if (this.cantidadMayusculas == 3) {
          this.seguridad = this.seguridad + 10;
        }
      }
      for (let i = 0; i <= caracteresEspeciales.length; i++) {
        if (contrasena.data == caracteresEspeciales[i]) {
          this.cantidadEspeciales++;
          if (this.cantidadEspeciales == 3) {
            this.seguridad = this.seguridad + 30;
          }
        }
      }
    }

    barra.style.width = this.seguridad + "%";
    barra.style.height = "5px";

    if (this.seguridad <= 10) {
      barra.style.backgroundColor = "red"
    } else {
      if (this.seguridad <= 30) {
        barra.style.backgroundColor = "orange"
      } else {
        barra.style.backgroundColor = "green"
      }
    }

    this.cantidadCaracteres=contrasena.target.value.length;
    this.cantidadMayusculas=mayusculas;
    this.cantidadEspeciales=especial;
  }

}
