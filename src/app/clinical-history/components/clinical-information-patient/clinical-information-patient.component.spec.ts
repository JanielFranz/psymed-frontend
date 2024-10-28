import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicalInformationPatientComponent } from './clinical-information-patient.component';

describe('ClinicalInformationPatientComponent', () => {
  let component: ClinicalInformationPatientComponent;
  let fixture: ComponentFixture<ClinicalInformationPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClinicalInformationPatientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClinicalInformationPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
