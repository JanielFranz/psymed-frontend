import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BaseChartDirective } from "ng2-charts";
import { BiologicalAnalytic } from "../../model/biological-analytic.entity";
import { ChartData, ChartType } from "chart.js";
import { MatCard, MatCardContent, MatCardTitle } from "@angular/material/card";
import { TranslateModule, TranslateService } from "@ngx-translate/core";

/**
 * BarChart Component
 * @class BarChartComponent
 * @description
 * This component is responsible for displaying the bar chart.
 * @property {BiologicalAnalytic} biologicalAnalytic - The biological analytic data that will be displayed in the bar chart.
 * @property {Array<string>} barChartLabels - The labels that will be displayed in the bar chart.
 * @property {ChartData<ChartType, Array<string>, string>} barChartData - The data that will be displayed in the bar chart.
 * @method {updateChart} - Updates the chart with the new data.
 * @method {initialData} - Initializes the data with zeros.
 * @method {ngOnChanges} - Lifecycle hook that is called when the input properties change.
 * @method {ngOnInit} - Lifecycle hook that is called after Angular has initialized all data-bound properties of a directive.
 *
 */
@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [
    BaseChartDirective,
    MatCard,
    MatCardTitle,
    MatCardContent,
    TranslateModule
  ],
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnChanges, OnInit {
  // #region Attributes
  @Input() biologicalAnalytic!: BiologicalAnalytic;
  protected barChartLabels: Array<string> = ['hunger', 'sleep', 'energy', 'hydration'];
  barChartData!: ChartData<ChartType, Array<string>, string>;

  /**
   * Bar chart options for responsiveness and styling
   */
  public barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,  // Ensures chart scales properly
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          maxRotation: 0,  // Prevents x-axis labels from rotating
          autoSkip: true,  // Skips labels to fit in the view
        }
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 0.1,  // Adjusts the interval of tick marks
        }
      }
    },
    plugins: {
      legend: {
        position: 'top'
      }
    }
  };

  constructor(private translateService: TranslateService) {}

  /**
   * Initializes the chart data with zeros.
   * @description
   * Called during component initialization to set default values for the chart.
   */
  private initialData() {
    this.barChartData = {
      labels: this.barChartLabels,
      datasets: [
        {
          data: ['0', '0', '0', '0'],
          label: 'Month average',
          backgroundColor: ['purple', '#36A2EB', 'grey', 'blue'],
          borderColor: ['purple', '#36A2EB', 'grey', 'blue'],
          borderWidth: 1
        }
      ]
    };
  }

  /**
   * Updates the chart data with the latest values from `biologicalAnalytic`.
   * @description
   * This method fetches the translation for "Month average" and updates the dataset.
   */
  private updateChart() {
    let monthAverageLabel;
    this.translateService.get("pages.patient-management.actions.dashboard-analytics-month-average")
      .subscribe((text: string) => {
        monthAverageLabel = text;
      });

    this.barChartData = {
      labels: this.barChartLabels,
      datasets: [
        {
          data: [
            this.biologicalAnalytic.hungerAverage,
            this.biologicalAnalytic.sleepAverage,
            this.biologicalAnalytic.energyAverage,
            this.biologicalAnalytic.hydrationAverage
          ],
          label: monthAverageLabel,
          backgroundColor: ['purple', '#36A2EB', 'grey', 'blue'],
          borderColor: ['purple', '#36A2EB', 'grey', 'blue'],
          borderWidth: 1,
          barThickness: 'flex',  // Allows bars to resize dynamically
          maxBarThickness: 50,   // Sets a maximum bar thickness
          minBarLength: 2        // Ensures bars are visible even with small values
        }
      ]
    };
  }

  /**
   * Lifecycle hook called when the input properties change.
   * @param {SimpleChanges} changes - The changes that occurred.
   * @returns {void}
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['biologicalAnalytic']) {
      this.updateChart();
    }
  }

  /**
   * Lifecycle hook called after Angular has initialized all data-bound properties.
   * Initializes the chart data with default values.
   * @returns {void}
   */
  ngOnInit(): void {
    this.initialData();
  }
}
