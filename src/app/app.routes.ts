import { Routes } from '@angular/router';
import {HomeComponent} from "./public/pages/home/home.component";
import {
  DashboardAndAnalyticsComponent
} from "./dashboard-analytics/pages/dashboard-and-analytics/dashboard-and-analytics.component";

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'dashboard-analytics', component: DashboardAndAnalyticsComponent }
];
