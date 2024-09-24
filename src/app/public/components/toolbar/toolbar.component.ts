import { Component, OnInit } from '@angular/core';
import {NotificationService} from "../../../appointment-and-administration/services/notification.service";
import {SessionService} from "../../../appointment-and-administration/services/session.service";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {MatToolbar} from "@angular/material/toolbar";
import {RouterLink} from "@angular/router";
import {MatAnchor, MatIconButton} from "@angular/material/button";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatIcon} from "@angular/material/icon";
import {MatBadge} from "@angular/material/badge";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  standalone: true,
  imports: [
    DatePipe,
    MatToolbar,
    NgForOf,
    RouterLink,
    MatAnchor,
    MatIconButton,
    MatMenuTrigger,
    MatIcon,
    MatBadge,
    MatMenu,
    MatMenuItem,
    NgIf
  ],
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  newAppointmentsCount: number = 0; // Counter for new appointments
  appointments: any[] = []; // Array to hold appointments list

  // Define the options array for navigation links
  options = [
    { title: 'Home', path: '/home' },
    { title: 'Appointments', path: '/appointments' },
    { title: 'Patients', path: '/patients' }
  ];

  constructor(
    private notificationService: NotificationService,
    private appointmentService: SessionService // Inject the appointment service
  ) {}

  ngOnInit(): void {
    // Subscribe to the observable that tracks the count
    this.notificationService.newAppointmentsCount$.subscribe(count => {
      this.newAppointmentsCount = count;
    });
  }

  // Reset the notifications count and fetch the appointments list
  viewNotifications(): void {
    // Reset the notification counter
    this.notificationService.resetCounter();

    // Fetch the list of appointments
    this.fetchAppointments();
  }

  // Fetch appointments from the service
  fetchAppointments() {
    this.appointmentService.getAll().subscribe({
      next: (appointments: any[]) => {
        this.appointments = appointments; // Store the fetched appointments
      },
      error: (error) => {
        console.error('Error fetching appointments:', error);
      }
    });
  }
}
