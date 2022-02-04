import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TemplateComponent} from "./pages/template/template.component";
import {ReactiveComponent} from "./pages/reactive/reactive.component";
import {HomeComponent} from "./components/home/home.component";

const routes: Routes = [
  {path:'home', component:HomeComponent},
  {path:'template', component:TemplateComponent},
  {path:'reactive', component:ReactiveComponent},
  {path:'**',pathMatch:'full', redirectTo:'home'}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
