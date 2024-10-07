import {Component, EventEmitter, Output} from '@angular/core';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatButton, MatFabButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";

interface Month {
  value: string; //Maybe I will change it to string
  viewValue: string;
}

interface Year {
  value: string;
}

/**
 * PieFilter Component
 * @class PieFilterComponent
 * @description
 * This component is responsible for filtering the data that will be displayed in the pie chart and the bar chart.
 * It has two dropdowns, one for the year and one for the month. The user can select a year and a month and then click on the filter button to request the data.
 * @property {Year[]} years - The years that will be displayed in the year dropdown.
 * @property {Month[]} months - The months that will be displayed in the month dropdown.
 * @property {string | null} selectedYear - The selected year.
 * @property {string | null} selectedMonth - The selected month.
 * @property {EventEmitter<{ month: string | null, year: string | null }>} dataFilterRequested - The event that will be emitted when the user clicks on the filter button.
 * @method {validateInputText} - Validates the input text. If the user didn't select a year and a month, it will show an alert.
 * @method {filterRequest} - Filters the data by year and month. It will call the dataFilterRequested event.
 *
 */
@Component({
  selector: 'app-pie-filter',
  standalone: true,
  imports: [
    MatFormField,
    MatSelect,
    MatOption,
    MatLabel,
    MatButton,
    MatFabButton,
    MatIcon,
    FormsModule,
    NgForOf
  ],
  templateUrl: './pie-filter.component.html',
  styleUrl: './pie-filter.component.css'
})
export class PieFilterComponent {
  // #region Attributes
  years: Year[] = [{ value: '2023' }, { value: '2024' }]

  months: Month[] = [{value: "01", viewValue: 'January'},
                      {value: "02", viewValue: 'February'},
                      {value: "03", viewValue: 'March'},
                      {value: "04", viewValue: 'April'},
                      {value: "05", viewValue: 'May'},
                      {value: "06", viewValue: 'June'},
                      {value: "07", viewValue: 'July'},
                      {value: "08", viewValue: 'August'},
                      {value: "09", viewValue: 'September'},
                      {value: "10", viewValue: 'October'},
                      {value: "11", viewValue: 'November'},
                      {value: "12", viewValue: 'December'}];

  public selectedYear: string | null = null;
  public selectedMonth: string | null = null;

  @Output() protected dataFilterRequested = new EventEmitter<{ month: string | null, year: string | null }>();
  // #endregion

  // #region Utility Methods
  /**
   * Validate input text
   * @description
   * Validates the input text. If the user didn't select a year and a month, it will show an alert.
   * @returns {boolean} - Returns true if the input text is valid, otherwise returns false.
   */
  private validateInputText() : boolean {
    if(!this.selectedYear && !this.selectedMonth) {
      console.log('ERROR',this.selectedMonth, this.selectedYear);
      alert("Please select a year and a month");
      return false;
      //TODO Make The Input Color Red
    }
    console.log(this.selectedMonth, this.selectedYear);
    return true;
  }

  /**
   * Filter Request
   * @description
   * Filters the data by year and month. It will call the dataFilterRequested event.
   * @returns {void}
   */
  filterRequest() {
      if (this.validateInputText()) {
        console.log("Filtering by year: " + this.selectedYear + " and month: " + this.selectedMonth);
        this.dataFilterRequested.emit({ month: this.selectedMonth, year: this.selectedYear })
      }

    }
  // #endregion
}
