import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styles: [
  ]
})
export class TemplateComponent implements OnInit {

  nombre:string='Hola';
  usuario = {
    nombre: "eee"
  }
  email:string="hola@gmail.com";

  constructor() { }

  ngOnInit(): void {
  }

  guardar(forma: NgForm){
    console.log("Submit disparado");
    console.log(forma);
    console.log(forma.value);
  }

}
