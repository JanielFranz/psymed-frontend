
import { Routes } from '@angular/router';
import {HomeComponent} from "./public/pages/home/home.component";
import {
  AnalyticsDashboardComponent
} from "./dashboard-analytics/pages/analytics-dashboard/analytics-dashboard.component";
import {LoginComponent} from "./public/pages/login/login.component";
import {MedicationManagementComponent} from "./medication-management/pages/medication-management/medication-management.component";
import {PatientManagementComponent} from "./user-mamagement/pages/patient-management/patient-management.component";
import {MoodStatementEntryComponent} from "./patientEntrys/pages/mood-statement-entry/mood-statement-entry.component";
import {
  PatientAppointmentPageComponent
} from "./appointment-and-administration/pages/patient-appointment-page/patient-appointment-page.component";
import {HistoryManagementComponent} from "./user-mamagement/pages/history-management/history-management.component";
import  {BiologicalFunctionsEntryComponent} from "./patientEntrys/pages/biological-functions-entry/biological-functions-entry.component";
import {
  ProfessionalAppointmentPageComponent
} from "./appointment-and-administration/pages/professional-appointment-page/professional-appointment-page.component";
import {SessionNotesComponent} from "./session-notes/pages/session-notes/session-notes.component";
import  {ProfessionalViewTaskComponent} from "./session-notes/pages/professional-view-task/professional-view-task.component";
import {PatientMedicationComponent} from "./medication-management/pages/patient-medication/patient-medication.component";
import {EditProfileComponent} from "./iam/pages/edit-profile/edit-profile.component";
import {AccountProfileComponent} from "./iam/pages/account-profile/account-profile.component";

export const routes: Routes = [
  { path: ''                                                        , redirectTo: 'home', pathMatch: 'full' },  // Default route that redirects to HomeComponent
  { path: 'home'                                                    , component: HomeComponent },
  { path: 'patient-management/:id/dashboard-analytics'             , component: AnalyticsDashboardComponent },
  { path: 'login'                                                   , component: LoginComponent },
  { path: 'patient-management'                                      , component: PatientManagementComponent },
  { path: 'patient-management/:id/medication-management'     , component: MedicationManagementComponent }, // we use the :patientId to pass the patient ID as a parameter
  { path: 'mood-state'                                              , component: MoodStatementEntryComponent },
  { path: 'patient-management/:id/patient-appointment-list'         , component: PatientAppointmentPageComponent },
  { path: 'patient-management/:id/clinical-history/:historyId'          , component: HistoryManagementComponent },
  { path: 'biological-functions'                                    , component: BiologicalFunctionsEntryComponent },
  { path: 'patient/prescription/:id', component: PatientMedicationComponent },
  { path: 'appointment-list'                                        , component: ProfessionalAppointmentPageComponent},
  { path: 'patient-management/:id/patient-appointment-list/:appointmentId/notes'         , component: SessionNotesComponent },
  { path: 'patient-management/:id/patient-appointment-list/:appointmentId/task'         , component: ProfessionalViewTaskComponent },
  { path: ':id/appointment-list/:appointmentId/task'  , component: ProfessionalViewTaskComponent },
  { path: 'profile'                                            , component: AccountProfileComponent },
  { path: 'edit-profile'                                            , component: EditProfileComponent },
  { path: '**'                                                      , redirectTo: 'home' }  // Wildcard route for invalid paths, redirects to HomeComponent
];
