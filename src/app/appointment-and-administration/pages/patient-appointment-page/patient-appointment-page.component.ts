import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentListComponent } from '../../components/appointment-list/appointment-list.component';
import { AppointmentFormComponent } from '../../components/appointment-form/appointment-form.component';

@Component({
  selector: 'app-patient-appointment-page',
  standalone: true,
  imports: [
    CommonModule,
    AppointmentListComponent,
    AppointmentFormComponent
  ],
  templateUrl: './patient-appointment-page.component.html',
  styleUrls: ['./patient-appointment-page.component.css']
})
export class PatientAppointmentPageComponent {}
