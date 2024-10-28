import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Diagnostic} from "../../model/diagnostic.entity";
import {DiagnosticService} from "../../services/diagnostic.service";
import {Location} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-diagnostic-edit',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './diagnostic-edit.component.html',
  styleUrl: './diagnostic-edit.component.css'
})
export class DiagnosticEditComponent implements OnInit{

  diagnostic!: Diagnostic;

  constructor(
    private route: ActivatedRoute,
    private diagnosticService: DiagnosticService,
    private location: Location
  ) {}


  ngOnInit() {
    const clinicalId = this.route.snapshot.params['clinicalHistoryId'];
    this.diagnosticService.getDiagnosticByClinicalHistoryID(clinicalId).subscribe( (diagnostic: Diagnostic) =>{
      this.diagnostic = diagnostic;
    });
  }

  save(){
    this.diagnostic.updatedAt = new Date().toLocaleDateString();
    this.diagnosticService.updateDiagnostic(this.diagnostic);
    this.location.back();
  }

}
