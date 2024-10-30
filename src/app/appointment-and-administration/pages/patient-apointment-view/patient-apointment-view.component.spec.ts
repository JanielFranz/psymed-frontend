import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientApointmentViewComponent } from './patient-apointment-view.component';

describe('PatientApointmentViewComponent', () => {
  let component: PatientApointmentViewComponent;
  let fixture: ComponentFixture<PatientApointmentViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientApointmentViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientApointmentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
