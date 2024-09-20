import { Component } from '@angular/core';
import {DashboardComponent} from "../../components/dashboard.component";

@Component({
  selector: 'app-dashboard-and-analytics',
  standalone: true,
  imports: [
    DashboardComponent
  ],
  templateUrl: './dashboard-and-analytics.component.html',
  styleUrl: './dashboard-and-analytics.component.css'
})
export class DashboardAndAnalyticsComponent {

}
