import { Component } from '@angular/core';
import { MatAnchor, MatIconButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { MatMenu, MatMenuTrigger } from "@angular/material/menu";
import { MatToolbar } from "@angular/material/toolbar";
import { RouterLink } from "@angular/router";
import {NotificationService} from "../../../appointment-and-administration/services/notification.service";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    MatAnchor,
    MatIcon,
    MatIconButton,
    MatMenu,
    MatToolbar,
    RouterLink,
    MatMenuTrigger,
    NgForOf,
    NgIf
  ],
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'] // Use `styleUrls` instead of `styleUrl`
})
export class ToolbarComponent {
  protected options = [
    { path: '/home', title: 'Home' },
    { path: '/dashboard-analytics', title: 'Dashboard' },
    { path: '/medication-management', title: 'Medication' },
    { path: '/appointment-list', title: 'Appointments' },
  ];

  newAppointmentsCount: number = 0; // Variable to store the count of new appointments

  constructor(private notificationService: NotificationService) {
    // Subscribe to the new appointments counter observable
    this.notificationService.newAppointmentsCount$.subscribe(count => {
      this.newAppointmentsCount = count;
    });
  }

  // Method to reset the counter when notifications are viewed
  viewNotifications(): void {
    this.notificationService.resetCounter();
  }
}
