
import { Routes } from '@angular/router';
import {HomeComponent} from "./public/pages/home/home.component";
import {
  AnalyticsDashboardComponent
} from "./dashboard-analytics/pages/analytics-dashboard/analytics-dashboard.component";
import {LoginComponent} from "./public/pages/login/login.component";
import {MedicationManagementComponent} from "./medication-management/pages/medication-management/medication-management.component";
import {PatientManagementComponent} from "./user-mamagement/pages/patient-management/patient-management.component";
import {MoodStatementEntryComponent} from "./patientEntrys/pages/mood-statement-entry/mood-statement-entry.component";
import {PatientAppointmentPageComponent} from "./appointment-and-administration/pages/patient-appointment-page/patient-appointment-page.component";
import {ClinicalViewComponent} from "./clinical-history/pages/clinical-view/clinical-view.component";
import {ClinicalEditComponent} from "./clinical-history/pages/clinical-edit/clinical-edit.component";
import {ClinicalInformationPatientComponent} from "./clinical-history/components/clinical-information-patient/clinical-information-patient.component";
import {ProfessionalDiagnosticViewComponent} from "./diagnostic/pages/professional-diagnostic-view/professional-diagnostic-view.component";
import {DiagnosticEditViewComponent} from "./diagnostic/pages/diagnostic-edit-view/diagnostic-edit-view.component";
import  {BiologicalFunctionsEntryComponent} from "./patientEntrys/pages/biological-functions-entry/biological-functions-entry.component";
import {
  ProfessionalAppointmentPageComponent
} from "./appointment-and-administration/pages/professional-appointment-page/professional-appointment-page.component";
import {SessionNotesComponent} from "./session-notes/pages/session-notes/session-notes.component";
import  {ProfessionalViewTaskComponent} from "./session-notes/pages/professional-view-task/professional-view-task.component";
import {PatientMedicationComponent} from "./medication-management/pages/patient-medication/patient-medication.component";
import {EditProfileComponent} from "./profile/pages/edit-profile/edit-profile.component";
import {AccountProfileComponent} from "./profile/pages/account-profile/account-profile.component";
import {PatientsAppointmentPageComponent} from "./appointment-and-administration/pages/patients-appointment-page/patients-appointment-page.component";
import {PatientViewTaskComponent} from "./session-notes/pages/patient-view-task/patient-view-task.component";
import {authenticationGuard} from "./iam/services/authentication.guard";
import {AuthenticationComponent} from "./iam/pages/authentication/authentication.component";
// import {SingInComponent} from "./iam/pages/sing-in/sing-in.component";

export const routes: Routes = [
  { path: ''                                                        , redirectTo: 'home', pathMatch: 'full' },  // Default route that redirects to HomeComponent
  { path: 'home'                                                    , component: HomeComponent },
  { path: 'login'                                                   , component: LoginComponent },
  { path: 'authentication', component: AuthenticationComponent },
  { path: 'patient-management/:id/dashboard-analytics'             , component: AnalyticsDashboardComponent,canActivate:[authenticationGuard] },
  { path: 'patient-management'                                      , component: PatientManagementComponent ,canActivate:[authenticationGuard]},
  { path: 'patient-management/:id/medication-management'     , component: MedicationManagementComponent,canActivate:[authenticationGuard] }, // we use the :patientId to pass the patient ID as a parameter
  { path: 'mood-state'                                              , component: MoodStatementEntryComponent,canActivate:[authenticationGuard] },
  { path: 'patient-management/:id/patient-appointment-list'         , component: PatientAppointmentPageComponent,canActivate:[authenticationGuard] },
  { path: 'patient/patient-appointment-list'         , component: PatientAppointmentPageComponent,canActivate:[authenticationGuard] },
  { path: 'patient-management/:id/clinical-history/:clinicalHistoryId'          , component: ClinicalViewComponent,canActivate:[authenticationGuard] },
  { path: 'patient-management/:id/clinical-history/:clinicalHistoryId/admin-edit'          , component: ClinicalEditComponent,canActivate:[authenticationGuard] },
  { path: 'patient/clinical-history'          , component: ClinicalInformationPatientComponent,canActivate:[authenticationGuard] },
  { path: 'patient-management/:id/clinical-history/:clinicalHistoryId/diagnostic'          , component: ProfessionalDiagnosticViewComponent,canActivate:[authenticationGuard] },
  { path: 'patient-management/:id/clinical-history/:clinicalHistoryId/diagnostic/admin-edit'          , component: DiagnosticEditViewComponent,canActivate:[authenticationGuard] },
  { path: 'biological-functions'                                    , component: BiologicalFunctionsEntryComponent,canActivate:[authenticationGuard] },
  { path: 'patient/prescription/:id', component: PatientMedicationComponent },
  { path: 'appointment-list'                                        , component: ProfessionalAppointmentPageComponent,canActivate: [authenticationGuard]},
  { path: 'patient-management/:id/patient-appointment-list/:appointmentId/notes'         , component: SessionNotesComponent,canActivate:[authenticationGuard] },
  { path: 'patient-management/:id/patient-appointment-list/:appointmentId/task'         , component: ProfessionalViewTaskComponent,canActivate:[authenticationGuard] },
  { path: 'patient/appointment-list'         , component: PatientsAppointmentPageComponent,canActivate:[authenticationGuard] },
  { path: 'patient/appointment-list/tasks/:appointmentId'         , component: PatientViewTaskComponent,canActivate:[authenticationGuard] },
  { path: ':id/appointment-list/:appointmentId/task'  , component: ProfessionalViewTaskComponent,canActivate:[authenticationGuard] },
  { path: ':id/appointment-list/:appointmentId/note'  , component: SessionNotesComponent,canActivate:[authenticationGuard] },
  { path: 'patient/profile/:id'                                            , component: AccountProfileComponent,canActivate:[authenticationGuard] },
  { path: 'professional/profile/:id'                                            , component: AccountProfileComponent,canActivate:[authenticationGuard] },
  { path: 'patient/edit-profile/:id'                                            , component: EditProfileComponent,canActivate:[authenticationGuard] },
  { path: 'professional/edit-profile/:id'                                            , component: EditProfileComponent,canActivate:[authenticationGuard] },
  // { path: 'sing-in', component: SingInComponent },
  { path: '**'                                                      , redirectTo: 'home' },  // Wildcard route for invalid paths, redirects to HomeComponent
];
