import { Component } from '@angular/core';
import {MatAnchor, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatMenu, MatMenuTrigger} from "@angular/material/menu";
import {MatToolbar} from "@angular/material/toolbar";
import {RouterLink} from "@angular/router";

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
    MatMenuTrigger
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent {
  protected options = [
    { path: '/home', title: 'Home' },
    { path: '/dashboard-analytics', title: 'Dashboard' },
    { path: '/medication-management', title: 'Medication' },
    { path: '/appointment-list', title: 'Appointments' },
  ]
}
