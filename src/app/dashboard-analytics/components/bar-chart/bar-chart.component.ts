import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {BaseChartDirective} from "ng2-charts";
import {BiologicalAnalytic} from "../../model/biological-analytic.entity";
import {ChartData, ChartType} from "chart.js";
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
//SHOULD I USE VIEWCHILD??????
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

  // #region Methods
  public barChartOptions = {
    responsive: true
  }

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
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['biologicalAnalytic']){
      this.updateChart();
    }
  }

  ngOnInit(): void {
    this.initialData();
  }



}
