import {Component, Input, OnInit} from '@angular/core';
import { BiologicalFunctions } from "../../models/biological-functions.entity";
import {BiologicalFunctionsService} from "../../services/biological-functions.service";
import {ActivatedRoute} from "@angular/router";
import {NgForOf} from "@angular/common";
import {BiologicalCardComponent} from "../biological-card/biological-card.component";

@Component({
  selector: 'app-biological-list',
  standalone: true,
  imports: [
    NgForOf,
    BiologicalCardComponent
  ],
  templateUrl: './biological-list.component.html',
  styleUrl: './biological-list.component.css'
})
export class BiologicalListComponent implements OnInit{
  @Input() biologicalFunctions!: BiologicalFunctions[];

  constructor(
    private biologicalFunctionsService: BiologicalFunctionsService,
    private route: ActivatedRoute
  ) {}


  ngOnInit() {
    const patientId = Number(this.route.snapshot.paramMap.get("id"));
    this.biologicalFunctionsService.getBiologicalFunctionsByPatientId(patientId)
      .subscribe((biologicalFunctions: BiologicalFunctions[] ) =>{
        this.biologicalFunctions = biologicalFunctions;
      });
  }
}
