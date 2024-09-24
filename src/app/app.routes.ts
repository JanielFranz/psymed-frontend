import { Routes } from '@angular/router';
import { HomeComponent } from './public/pages/home/home.component';
import { AppointmentPageComponent } from './appointment-and-administration/pages/appointment-page/appointment-page.component';
import {Patient} from "./shared/model/patient.entity";
import {
  PatientAppointmentPageComponent
} from "./appointment-and-administration/pages/patient-appointment-page/patient-appointment-page.component";
import {
  MedicationManagementComponent
} from "./medicationManagement/pages/medication-management/medication-management.component";
import {
  AnalyticsDashboardComponent
} from "./dashboard-analytics/pages/analytics-dashboard/analytics-dashboard.component";


export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'dashboard-analytics'      , component: AnalyticsDashboardComponent },
  { path: 'medication-management', component: MedicationManagementComponent },
  { path: 'appointment-list', component: AppointmentPageComponent },

  // Add a dynamic parameter `id` for patient appointments
  { path: 'patient-appointment-list/:id', component: PatientAppointmentPageComponent }
];
