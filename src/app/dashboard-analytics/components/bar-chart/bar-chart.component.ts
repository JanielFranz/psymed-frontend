import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {BaseChartDirective} from "ng2-charts";
import {BiologicalAnalytic} from "../../model/biological-analytic.entity";
import {ChartData, ChartType} from "chart.js";
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
//SHOULD I USE VIEWCHILD??????
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
    MatCardContent
  ],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.css'
})
export class BarChartComponent implements OnChanges, OnInit{
  // #region Attributes
  @Input() biologicalAnalytic!: BiologicalAnalytic;
  protected barChartLabels: Array<string> = ['hunger', 'sleep', 'energy', 'hydration']
  barChartData!: ChartData<ChartType, Array<string>, string>

  //#endregion

  // #region Utility Methods

  /**
   *Set the options for the bar chart
   * @description
   * The bar chart options are responsive.
   */
  public barChartOptions = {
    responsive: true
  }

  /**
   * Update chart
   * @description
   * This method updates the chart with the new data.
   * @private
   * @returns {void}
   */
  private updateChart() {
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
          label: 'Month average'
          // backgroundColor: ['purple', '#36A2EB', 'grey', 'blue']
        }
      ],
    }
  }

  /**
   * Initial Data
   * @description
   * Initializes the data with zeros.
   * @private
   * @returns {void}
   */
  private initialData() {
    this.barChartData = {
      labels: this.barChartLabels,
      datasets: [
        {
          data: [
            '0',
            '0',
            '0',
            '0'
          ],
          label: 'Month average'
          // backgroundColor: ['purple', '#36A2EB', 'grey', 'blue']
        }
      ],
    }
  }
  //#endregion

  //#region Lifecycle Hooks

  /**
   * On Changes
   * @description
   * Lifecycle hook that is called when the input properties change.
   * @param {SimpleChanges} changes - The changes that occurred.
   * @returns {void}
   */
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['biologicalAnalytic']){
      this.updateChart();
    }
  }

  /**
   * On Init
   * @description
   * Lifecycle hook that is called after Angular has initialized all data-bound properties of a directive.
   * @returns {void}
   */
  ngOnInit(): void {
    this.initialData();
  }

  //#endregion


}
