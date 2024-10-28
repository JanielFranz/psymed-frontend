import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Diagnostic} from "../../model/diagnostic.entity";
import {DiagnosticService} from "../../services/diagnostic.service";


@Component({
  selector: 'app-diagnostic-form',
  standalone: true,
  imports: [],
  templateUrl: './diagnostic-form.component.html',
  styleUrl: './diagnostic-form.component.css'
})
export class DiagnosticFormComponent implements OnInit{

  @Input() diagnostic!: Diagnostic;


  constructor(
    private route: ActivatedRoute,
    private diagnosticService: DiagnosticService,
    private router: Router
  ) {
  }

  ngOnInit() {
    const clinicalId = this.route.snapshot.params['clinicalHistoryId'];

    this.diagnosticService.getDiagnosticByClinicalHistoryID(clinicalId).subscribe((diagnostic: Diagnostic) => {
      this.diagnostic = diagnostic;
    });

  }

  redirectToAdminEdit() {
    this.router.navigate([`./admin-edit`], { relativeTo: this.route })
      .then(success => {
        if (success) {
          console.log('Navigation successful');
        } else {
          console.error('Navigation failed');
        }
      })
      .catch(error => {
        console.error('Navigation error', error);
      });
  }

}
