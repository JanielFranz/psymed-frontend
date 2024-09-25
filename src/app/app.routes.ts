import { Routes } from '@angular/router';
import { HomeComponent } from "./public/pages/home/home.component";
import {
  AnalyticsDashboardComponent
} from "./dashboard-analytics/pages/analytics-dashboard/analytics-dashboard.component";
import { LoginComponent } from "./public/pages/login/login.component";
import { MedicationManagementComponent } from "./medicationManagement/pages/medication-management/medication-management.component";
import { PatientManagementComponent } from "./user-mamagement/pages/patient-management/patient-management.component";
import { MoodStatementEntryComponent } from "./patientEntrys/pages/mood-statement-entry/mood-statement-entry.component";
import {
  PatientAppointmentPageComponent
} from "./appointment-and-administration/pages/patient-appointment-page/patient-appointment-page.component";
import { HistoryManagementComponent } from "./user-mamagement/pages/history-management/history-management.component";
import { BiologicalFunctionsEntryComponent } from "./patientEntrys/pages/biological-functions-entry/biological-functions-entry.component";
import {
  AppointmentPageComponent
} from "./appointment-and-administration/pages/appointment-page/appointment-page.component";

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },  // Default route that redirects to HomeComponent
  { path: 'home', component: HomeComponent },
  { path: 'patient-management/dashboard-analytics/:patientId', component: AnalyticsDashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'patient-management', component: PatientManagementComponent },
  { path: 'patient-management/medication-management/:patientId', component: MedicationManagementComponent },
  { path: 'mood-state/:patientId', component: MoodStatementEntryComponent },
  { path: 'patient-management/patient-appointment-list/:id', component: PatientAppointmentPageComponent },
  { path: 'patient-management/clinical-history/:historyId', component: HistoryManagementComponent },
  { path: 'biological-functions/:patientId', component: BiologicalFunctionsEntryComponent },
  { path: 'appointment-list', component: AppointmentPageComponent },
  { path: '**', redirectTo: 'home' }  // Wildcard route for invalid paths, redirects to HomeComponent
];
