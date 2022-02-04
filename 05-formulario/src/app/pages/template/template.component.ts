import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {PaisService} from "../../service/pais.service";

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styles: [
  ]
})
export class TemplateComponent implements OnInit {
control:boolean=false;
control2:boolean=false;
  nombre:string='';
  usuario = {
    nombre: "",
    apellido:'',
    email:"",
    pais:"",
    fecha:"",
    color:"",
    contrasena:"",
    confirmarcontrasena:"",
    lenguajes:[,,,,],
    intereses: []
  }

  paisService:PaisService;
  paises:any[]=[];
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

  constructor(paisService:PaisService) {
    this.ojo1=true;
    this.ojo2=true;
    this.valorOjo1=true;
    this.valorOjo2=true;
    this.paisService=paisService;
    this.paises.unshift({
      name: 'Seleccione el país',
      alpha3Code: ''
    });
  }
  ngOnInit(): void {
    this.paisService.getPaises()
      .subscribe((data) => {
          for(let i=0;i<data.length; i++){
            this.paises.push(data[i])
          }
        }
      )
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


  guardar(forma: NgForm){
    this.alerta();
    console.log(forma.value)
    if (forma.invalid) {
      Object.values(forma.controls).forEach(control => {
        control.markAsTouched();
      })
      return;
    }
  }
  alerta(){
    this.popup=true;
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

  resetForm(forma: NgForm) {
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
