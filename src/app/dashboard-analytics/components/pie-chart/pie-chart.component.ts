import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {MoodAnalytic} from "../../model/mood-analytic.entity";
import {ChartType, ChartOptions, ChartData} from "chart.js";
import {BaseChartDirective} from "ng2-charts";
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {TranslateModule} from "@ngx-translate/core";

/**
 * PieChart Component
 * @class PieChartComponent
 * @description
 * This component is responsible for displaying the pie chart.
 * @property {MoodAnalytic} moodAnalytics - The mood analytic data that will be displayed in the pie chart.
 * @property {Array<string>} pieChartLabels - The labels that will be displayed in the pie chart.
 * @property {ChartData<ChartType, Array<string>, string>} pieChartData - The data that will be displayed in the pie chart.
 * @method {updateChart} - Updates the chart with the new data.
 * @method {initialData} - Initializes the data with zeros.
 * @method {ngOnChanges} - Lifecycle hook that is called when the input properties change.
 * @method {ngOnInit} - Lifecycle hook that is called after Angular has initialized all data-bound properties of a directive.
 *
 */
@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [
    BaseChartDirective,
    MatCard,
    MatCardTitle,
    MatCardContent,
    TranslateModule
  ],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.css'
})
export class PieChartComponent implements OnChanges, OnInit {
// #region Attributes
  @Input() moodAnalytics!: MoodAnalytic;
  pieChartData!: ChartData<ChartType, string[], string>
  pieChartLabels: string[] = ['Sad', 'Happy', 'Neutral', 'So Sad', 'So Happy'];

  /**
   * Set the options for the pie chart
   */
  public pieChartOptions: ChartOptions = {
    responsive: true
  };
// #endregion

  // #region Lifecycle Hooks

  /**
   * OnInit
   * @description
   * Lifecycle hook that is called after Angular has initialized all data-bound properties of a directive.
   * @returns {void}
   */
  ngOnInit(): void {
    this.initialData();
  }

  /**
   * OnChanges
   * @description
   * Lifecycle hook that is called when the input properties change.
   * @param changes - The changes that have been made.
   * @returns {void}
   */
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['moodAnalytics']){
      this.updateChart();
    }
  }
  //#endregion

  //#region Utility Methods

  /**
   * Update chart
   * @description
   * This method updates the chart with the new data.
   * @private
   * @returns {void}
   */
  private updateChart(): void {
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
          backgroundColor: ['purple', '#36A2EB', 'grey', 'blue', '#FFCE56']
        }
      ]
    }
  }

  /**
   * Initial Data
   * @description
   * Initializes the data with zeros.
   * @private
   * @returns {void}
   */
  private initialData(): void {
    this.pieChartData = {
      labels: this.pieChartLabels,
      datasets: [
        {
          data: ['0',
            '0',
            '0',
            '0',
            '0'
          ],
          backgroundColor: ['purple', '#36A2EB', 'grey', 'blue', '#FFCE56']
        }
      ]
    }

  }
  // #endRegion
}
