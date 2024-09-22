import { Routes } from '@angular/router';
import {HomeComponent} from "./public/pages/home/home.component";
import {MedicationFormComponent} from "./medicationManagement/modules/medication-form/medication-form.component";


export const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'medication-form', component: MedicationFormComponent},
];
