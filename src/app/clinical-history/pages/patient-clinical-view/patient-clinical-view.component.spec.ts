import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientClinicalViewComponent } from './patient-clinical-view.component';

describe('PatientClinicalViewComponent', () => {
  let component: PatientClinicalViewComponent;
  let fixture: ComponentFixture<PatientClinicalViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientClinicalViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientClinicalViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
