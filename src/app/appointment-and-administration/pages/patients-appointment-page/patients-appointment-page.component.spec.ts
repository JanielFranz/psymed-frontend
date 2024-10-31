import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientsAppointmentPageComponent } from './patients-appointment-page.component';

describe('PatientsAppointmentPageComponent', () => {
  let component: PatientsAppointmentPageComponent;
  let fixture: ComponentFixture<PatientsAppointmentPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientsAppointmentPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientsAppointmentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
