import { Injectable } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ValidacionesService {

  constructor() { }
  noApellido(control: FormControl):errorValidate | null {
    if (control.value?.toLowerCase() === "apellido") {
      return {
        noApellido: true
      }
    }
    return null;
  }

  passwordsIguales(pass1:string, pass2:string){
    return (formGroup:FormGroup) =>{
      const pass1control = formGroup.controls[pass1];
      const pass2control = formGroup.controls[pass2];
      if (pass1control.value === pass2control.value) {
        pass2control.setErrors(null);
      }else
        pass2control.setErrors({noEsIgual:true})
      }
    }
  existeUsuario(control:FormControl): Promise<errorValidate | null> | Observable<errorValidate> {
    return new Promise( (resolve, reject) => {
      setTimeout(() =>{
        if (control.value === "NOMBRE") {
          resolve({existe: true})
        }else{
        resolve(null)}
        }

      , 2000);
    });
  }



}

interface errorValidate {
  [s:string]:boolean
}

