import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TemplateComponent } from './pages/template/template.component';
import { ReactiveComponent } from './pages/reactive/reactive.component';

import {FormsModule} from "@angular/forms";
import {ReactiveFormsModule} from "@angular/forms";
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { HttpClientModule} from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { DialogoConfirmacionComponent } from './shared/dialogo-confirmacion/dialogo-confirmacion.component';
import { ContrasenaPipe } from './pipes/contrasena.pipe';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatSelectModule} from "@angular/material/select";
import {NgxMatSelectSearchModule} from "ngx-mat-select-search";

@NgModule({
  declarations: [
    AppComponent,
    TemplateComponent,
    ReactiveComponent,
    HomeComponent,
    NavbarComponent,
    DialogoConfirmacionComponent,
    ContrasenaPipe,



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatCheckboxModule,
    NgxMatSelectSearchModule,
    MatSelectModule
  ],
  providers: [{provide:MatDialogRef, useValue:{}}],
  bootstrap: [AppComponent],
  entryComponents: [

    DialogoConfirmacionComponent
  ]
})
export class AppModule { }
