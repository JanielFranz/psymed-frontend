import {Component, OnInit} from '@angular/core';
import {ClinicalHistoryService} from "../../services/clinical-history.service";
import {ClinicalHistory} from "../../model/clinical-history.entity";
import {ActivatedRoute} from "@angular/router";
import {MatCardModule} from '@angular/material/card';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-clinical-history-text',
  standalone: true,
  imports: [MatCardModule, CommonModule],
  templateUrl: './clinical-history-text.component.html',
  styleUrl: './clinical-history-text.component.css'
})
export class ClinicalHistoryTextComponent implements OnInit {
  historyId!: number;
  clinicalHistory!: ClinicalHistory;

  constructor(private clinicalHistoryService: ClinicalHistoryService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
  }

}
