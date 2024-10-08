import {Component, OnInit} from '@angular/core';
import {MoodAnalytic} from "../../model/mood-analytic.entity";
import {MoodAnalyticService} from "../../services/mood-analytic.service";
import {PieChartComponent} from "../../components/pie-chart/pie-chart.component";
import {PieFilterComponent} from "../../components/pie-filter/pie-filter.component";
import {ActivatedRoute} from "@angular/router";
import {BarChartComponent} from "../../components/bar-chart/bar-chart.component";
import {BiologicalAnalytic} from "../../model/biological-analytic.entity";
import {BiologicalAnalyticService} from "../../services/biological-analytic.service";

/**
 * AnalyticsDashboard Component
 * @class AnalyticsDashboardComponent
 * @description
 * This component is responsible for displaying the analytics dashboard.
 * It has a pie chart, a bar chart, and a filter component.
 * The pie chart displays the mood data of the patient, and the bar chart displays the biological data of the patient.
 * @property {MoodAnalytic} moodAnalyticData - The mood analytic data of the patient.
 * @property {BiologicalAnalytic} biologicalAnalyticData - The biological analytic data of the patient.
 * @property {string} patientId - The patient id.
 * @method {onFilterRequested} - Handles the filter requested event. It will call the getMoodAnalyticDataByDate and getBiologicalAnalyticDataByDate methods.
 * @method {getMoodAnalyticDataByDate} - Gets the mood analytic data by date. It will call the moodAnalyticService.findByDateAndPatientId method.
 * @method {getBiologicalAnalyticDataByDate} - Gets the biological analytic data by date. It will call the biologicalAnalyticService.findByDateAndPatientId method.
 * @method {ngOnInit} - Lifecycle method that is called after the component has been initialized. It will call the getMoodAnalyticDataByDate and getBiologicalAnalyticDataByDate methods.
 * @method {constructor} - Creates an instance of the AnalyticsDashboardComponent.
 * @param {MoodAnalyticService} moodAnalyticService - The mood analytic service.
 * @param {ActivatedRoute} route - The activated route.
 * @param {BiologicalAnalyticService} biologicalAnalyticService - The biological analytic service.
 *
 */
@Component({
  selector: 'app-analytics-dashboard',
  standalone: true,
  imports: [
    PieChartComponent,
    PieFilterComponent,
    BarChartComponent

  ],
  templateUrl: './analytics-dashboard.component.html',
  styleUrl: './analytics-dashboard.component.css'
})
export class AnalyticsDashboardComponent implements OnInit{
  // #region Attributes
  protected moodAnalyticData!: MoodAnalytic;
  protected biologicalAnalyticData!: BiologicalAnalytic;
  private patientId!: string;

  constructor(private moodAnalyticService: MoodAnalyticService,
              private route: ActivatedRoute,
              private biologicalAnalyticService: BiologicalAnalyticService) {
  }



// #endregion

  // #region Event Handlers

  /**
   * Filter Requested Event Handler
   * @description
   * This method handles the filter requested event.
   * It will call the getMoodAnalyticDataByDate and getBiologicalAnalyticDataByDate methods.
   * @param {month: any, year: any} date - The date that the user selected.
   */
  onFilterRequested(date: {month: any, year: any}){
    this.getMoodAnalyticDataByDate(date.month, date.year)
    this.getBiologicalAnalyticDataByDate(date.month, date.year)
  }
  // #endregion

  // #region Methods

  /**
   * Get Mood Analytic Data By Date
   * @description
   * Gets the mood analytic data by date.
   * It will call the moodAnalyticService.findByDateAndPatientId method.
   * @param month {string}
   * @param year {string}
   */
  getMoodAnalyticDataByDate(month: string, year: string) {
    this.moodAnalyticService.findByDateAndPatientId(month, year, this.patientId).subscribe((response: MoodAnalytic | null) => {
      if(response){
        this.moodAnalyticData = response;
      }
      else {
        console.log('No data found')
      }
      console.log('El response', response)
    })
  }

  /**
   * Get Biological Analytic Data By Date
   * @description
   * Gets the biological analytic data by date.
   * It will call the biologicalAnalyticService.findByDateAndPatientId method.
   * @param month {string}
   * @param year {string}
   */
  getBiologicalAnalyticDataByDate(month: string, year: string){
    this.biologicalAnalyticService.findByDateAndPatientId(month, year, this.patientId)
      .subscribe((response: BiologicalAnalytic | null) => {
        if(response) {
          this.biologicalAnalyticData = response;
        }
        else {
          console.log("No data found")
        }
        console.log("El response", response)
      })
  }
//#endregion

  //#region Lifecycle Hooks

  /**
   * NgOnInit
   * @description
   * Lifecycle method that is called after the component has been initialized.
   * It will call the getMoodAnalyticDataByDate and getBiologicalAnalyticDataByDate methods.
   */
  ngOnInit(): void {
    this.patientId = this.route.snapshot.paramMap.get('patientId')!;
    this.getMoodAnalyticDataByDate('0', '0')
    this.getBiologicalAnalyticDataByDate('0', '0')
    console.log("Start")
  }
  // #endregion




}
