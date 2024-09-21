import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionalAppointmentPageComponent } from './professional-appointment-page.component';

describe('ProfessionalAppointmentPageComponent', () => {
  let component: ProfessionalAppointmentPageComponent;
  let fixture: ComponentFixture<ProfessionalAppointmentPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfessionalAppointmentPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfessionalAppointmentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
