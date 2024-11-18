import {Component} from '@angular/core';
import {CommonModule, } from "@angular/common";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatCard, MatCardContent} from "@angular/material/card";

import {TranslateModule} from "@ngx-translate/core";
import {AppointmentListComponent} from "../../components/appointment-list/appointment-list.component"; // <-- Import Router

@Component({
  selector: 'app-professional-appointment-page',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatInputModule,
    MatButtonModule,
    MatCardContent,
    MatCard,
    TranslateModule,
    AppointmentListComponent
  ],
  templateUrl: './professional-appointment-page.component.html',
  styleUrl: './professional-appointment-page.component.css'
})
export class ProfessionalAppointmentPageComponent {
}
