import {Component, OnInit} from '@angular/core';
import {MoodAnalytic} from "../../model/mood-analytic.entity";
import {MoodAnalyticService} from "../../services/mood-analytic.service";
import {PieChartComponent} from "../../components/pie-chart/pie-chart.component";
import {PieFilterComponent} from "../../components/pie-filter/pie-filter.component";

@Component({
  selector: 'app-analytics-dashboard',
  standalone: true,
  imports: [
    PieChartComponent,
    PieFilterComponent

  ],
  templateUrl: './analytics-dashboard.component.html',
  styleUrl: './analytics-dashboard.component.css'
})
export class AnalyticsDashboardComponent implements OnInit{
  protected moodAnalyticData!: MoodAnalytic;

  constructor(private moodAnalyticService: MoodAnalyticService) {
    this.moodAnalyticData = new MoodAnalytic({});
  }



  getMoodAnalyticDataByDate(month: string, year: string) {
    this.moodAnalyticService.findByDate(month, year).subscribe((response: MoodAnalytic | null) => {
      if(response){
        this.moodAnalyticData = response;
      }
      else {
        console.log('No data found')
      }
      console.log('El response', response)
    })
  }

  ngOnInit(): void {
    this.getMoodAnalyticDataByDate('03', '2024');
  }


}
