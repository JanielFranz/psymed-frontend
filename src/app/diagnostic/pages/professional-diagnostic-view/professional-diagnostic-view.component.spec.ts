import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionalDiagnosticViewComponent } from './professional-diagnostic-view.component';

describe('ProfessionalDiagnosticViewComponent', () => {
  let component: ProfessionalDiagnosticViewComponent;
  let fixture: ComponentFixture<ProfessionalDiagnosticViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfessionalDiagnosticViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfessionalDiagnosticViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
