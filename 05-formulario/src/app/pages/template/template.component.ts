import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {PaisService} from "../../service/pais.service";
import {stringify} from "@angular/compiler/src/util";

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styles: [
  ]
})
export class TemplateComponent implements OnInit {

  nombre:string='';
  usuario = {
    nombre: "",
    apellido:'',
    email:"",
    pais:""
  }

  paisService:PaisService;
  paises:any[]=[];






  constructor(paisService:PaisService) {
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

  guardar(forma: NgForm){
    if (forma.invalid) {
      Object.values(forma.controls).forEach(control => {
        control.markAsTouched();
        })


      return;


    }

  }

}
