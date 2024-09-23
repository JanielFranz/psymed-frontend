import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {MatToolbar} from "@angular/material/toolbar";
import {MatAnchor, MatIconButton} from "@angular/material/button";
import {MatMenu, MatMenuTrigger} from "@angular/material/menu";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, MatToolbar, MatAnchor, MatIconButton, MatMenuTrigger, MatIcon, MatMenu],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'psymed-frontend';
  protected options = [
    { path: '/home', title: 'Home' },
    { path: '/dashboard-analytics', title: 'Dashboard' }
  ]
}
