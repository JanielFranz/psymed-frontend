import { Routes } from '@angular/router';
import {HomeComponent} from "./public/pages/home/home.component";
import {
  AnalyticsDashboardComponent
} from "./dashboard-analytics/pages/analytics-dashboard/analytics-dashboard.component";

import { MedicationManagementComponent} from "./medicationManagement/pages/medication-management/medication-management.component";

export const routes: Routes = [
  { path: 'home'                    , component: HomeComponent },
  { path: 'dashboard-analytics'      , component: AnalyticsDashboardComponent },
  { path: 'medication-management', component: MedicationManagementComponent }

];
