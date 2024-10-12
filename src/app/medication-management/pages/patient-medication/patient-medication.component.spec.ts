import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientMedicationComponent } from './patient-medication.component';

describe('PatientMedicationComponent', () => {
  let component: PatientMedicationComponent;
  let fixture: ComponentFixture<PatientMedicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientMedicationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientMedicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
