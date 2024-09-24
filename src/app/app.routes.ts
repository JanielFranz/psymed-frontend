import { Routes } from '@angular/router';
import {HomeComponent} from "./public/pages/home/home.component";
import {
  AnalyticsDashboardComponent
} from "./dashboard-analytics/pages/analytics-dashboard/analytics-dashboard.component";
import {LoginComponent} from "./public/pages/login/login.component";
import { MedicationManagementComponent} from "./medicationManagement/pages/medication-management/medication-management.component";
import {PatientManagementComponent} from "./user-mamagement/pages/patient-management/patient-management.component";
import {MoodStatementEntryComponent} from "./patientEntrys/pages/mood-statement-entry/mood-statement-entry.component";
import {HistoryManagementComponent} from "./user-mamagement/pages/history-management/history-management.component";
import  {BiologicalFunctionsEntryComponent} from "./patientEntrys/pages/biological-functions-entry/biological-functions-entry.component";

export const routes: Routes = [
  { path: 'home'                    , component: HomeComponent },
  { path: 'dashboard-analytics'     , component: AnalyticsDashboardComponent },
  { path: 'medication-management'   , component: MedicationManagementComponent },
  { path: 'login'                   , component: LoginComponent },
  { path: 'patient-management'      , component: PatientManagementComponent },
  { path: 'medication-management/:patientId', component: MedicationManagementComponent },// we use the :patientId to pass the patient ID as a parameter
  { path: 'mood-state/:patientId', component: MoodStatementEntryComponent },
  { path: 'clinical-history/:historyId', component: HistoryManagementComponent },
  { path: 'biological-functions/:patientId', component: BiologicalFunctionsEntryComponent }
];
