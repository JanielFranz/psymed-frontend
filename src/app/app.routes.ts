import { Routes } from '@angular/router';
import {HomeComponent} from "./public/pages/home/home.component";
import {MedicationManagementComponent} from "./medicationManagement/pages/medication-management/medication-management.component";


export const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'medication-management', component: MedicationManagementComponent},
];
