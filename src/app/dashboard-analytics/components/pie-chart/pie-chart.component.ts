import {Component, Input, OnInit} from '@angular/core';
import {MoodAnalytic} from "../../model/mood-analytic.entity";
import {ChartType, ChartOptions, ChartData } from "chart.js";
import {BaseChartDirective} from "ng2-charts";


@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [
    BaseChartDirective
  ],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.css'
})
export class PieChartComponent implements OnInit {

// #region Attributes
  @Input() moodAnalytics!: MoodAnalytic;
  pieChartData!: ChartData<ChartType, string[], string>
  pieChartLabels: string[] = ['Sad', 'Happy', 'Neutral', 'So Sad', 'So Happy'];

  public pieChartOptions: ChartOptions = {
    responsive: true
  };
// #endregion

  // #region Methods
  ngOnInit(): void {
    this.pieChartData = {
      labels: this.pieChartLabels,
      datasets: [
        {
          data: [this.moodAnalytics.soSadMood,
            this.moodAnalytics.sadMood,
            this.moodAnalytics.neutralMood,
            this.moodAnalytics.happyMood,
            this.moodAnalytics.soHappyMood
          ],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56' , 'grey', 'white']
        }
      ]
    }
  }
  // #endRegion
}
