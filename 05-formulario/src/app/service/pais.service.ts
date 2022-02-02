import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PaisService {

    http:HttpClient;


  constructor(http:HttpClient) {
    this.http=http;
  }

  getPaises():Observable<any>{

  return this.http.get('https://restcountries.com/v2/lang/es')

  }
}



