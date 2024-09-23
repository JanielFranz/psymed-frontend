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

  @Output() protected monthFilterRequested = new EventEmitter<any>();
  @Output() protected yearFilterRequested = new EventEmitter<any>();
  // #endregion

  // #region Methods
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
  onFilter() {
      if (this.validateInputText()) {
        console.log("Filtering by year: " + this.selectedYear + " and month: " + this.selectedMonth);
        this.monthFilterRequested.emit(this.selectedMonth);
        this.yearFilterRequested.emit(this.selectedYear);
      }

    }
  // #endregion
}
