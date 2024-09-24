import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BiologicalFunctions } from '../../models/biological-functions.entity';
import { BiologicalFunctionsService } from '../../services/biological-functions.service';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-biological-form',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './biological-form.component.html',
  styleUrls: ['./biological-form.component.css']
})
export class BiologicalFormComponent implements OnInit {
  patientId!: number;
  currentDate: string = new Date().toISOString().split('T')[0];
  biologicalFunctions: BiologicalFunctions = new BiologicalFunctions(1, 1, 1, 1, 1, this.currentDate, this.currentDate, 0);

  constructor(private biologicalFunctionsService: BiologicalFunctionsService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.patientId = +this.route.snapshot.paramMap.get('patientId')!;
    this.biologicalFunctions.idPatient = this.patientId;
  }

  onSubmit() {
    this.biologicalFunctions.updatedAt = new Date().toISOString().split('T')[0];
    this.biologicalFunctionsService.createBiologicalFunctions(this.biologicalFunctions, this.patientId).subscribe(() => {
      console.log('Biological functions created successfully');
    });
  }
}
