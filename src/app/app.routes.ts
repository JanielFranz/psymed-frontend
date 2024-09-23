import { Routes } from '@angular/router';
import {HomeComponent} from "./public/pages/home/home.component";
import {
  AnalyticsDashboardComponent
} from "./dashboard-analytics/pages/analytics-dashboard/analytics-dashboard.component";

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'dashboard-analytics', component: AnalyticsDashboardComponent }
];
