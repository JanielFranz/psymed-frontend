import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {MatToolbar} from "@angular/material/toolbar";
import {MatAnchor, MatIconButton} from "@angular/material/button";
import {MatMenu, MatMenuTrigger} from "@angular/material/menu";
import {MatIcon} from "@angular/material/icon";
import {ToolbarComponent} from "./public/components/toolbar/toolbar.component";
import {
  AppointmentFormComponent
} from "./appointment-and-administration/components/appointment-form/appointment-form.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, MatToolbar, MatAnchor, MatIconButton, MatMenuTrigger, MatIcon, MatMenu, ToolbarComponent, AppointmentFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'psymed-frontend';
  protected options = [
    { path: '/home', title: 'Home' },
    { path: '/learning/courses', title: 'Course' }
  ]
}
