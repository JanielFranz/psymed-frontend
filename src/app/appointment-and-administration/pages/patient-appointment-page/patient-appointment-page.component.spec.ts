import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientAppointmentPageComponent } from './patient-appointment-page.component';

describe('PatientAppointmentPageComponent', () => {
  let component: PatientAppointmentPageComponent;
  let fixture: ComponentFixture<PatientAppointmentPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientAppointmentPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientAppointmentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
