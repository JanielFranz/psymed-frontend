import { Routes } from '@angular/router';
import {HomeComponent} from "./public/pages/home/home.component";
import {
  AnalyticsDashboardComponent
} from "./dashboard-analytics/pages/analytics-dashboard/analytics-dashboard.component";
import {LoginComponent} from "./public/pages/login/login.component";
import { MedicationManagementComponent} from "./medicationManagement/pages/medication-management/medication-management.component";
import {PatientManagementComponent} from "./user-mamagement/pages/patient-management/patient-management.component";

export const routes: Routes = [
  { path: 'home'                    , component: HomeComponent },
  { path: 'dashboard-analytics'     , component: AnalyticsDashboardComponent },
  { path: 'medication-management'   , component: MedicationManagementComponent },
  { path: 'login'                   , component: LoginComponent },
  { path: 'patient-management'      , component: PatientManagementComponent },

];
