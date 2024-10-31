import { Component } from '@angular/core';
import {AppointmentListComponent} from "../../components/appointment-list/appointment-list.component";

@Component({
  selector: 'app-patients-appointment-page',
  standalone: true,
  imports: [AppointmentListComponent],
  templateUrl: './patients-appointment-page.component.html',
  styleUrl: './patients-appointment-page.component.css'
})
export class PatientsAppointmentPageComponent {

}
