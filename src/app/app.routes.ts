import { Routes } from '@angular/router';
import { HomeComponent } from './public/pages/home/home.component';
import { DashboardAndAnalyticsComponent } from './dashboard-analytics/pages/dashboard-and-analytics/dashboard-and-analytics.component';
import { AppointmentPageComponent } from './appointment-and-administration/pages/appointment-page/appointment-page.component';
import {
  ProfessionalAppointmentPageComponent
} from "./appointment-and-administration/pages/professional-appointment-page/professional-appointment-page.component";


export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'dashboard-analytics', component: DashboardAndAnalyticsComponent },
  { path: 'appointment-list', component: AppointmentPageComponent },

  // Add a dynamic parameter `id` for patient appointments
  { path: 'professional-appointment/:id', component: ProfessionalAppointmentPageComponent }
];
