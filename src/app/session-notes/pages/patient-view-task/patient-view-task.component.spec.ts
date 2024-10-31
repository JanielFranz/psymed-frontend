import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientViewTaskComponent } from './patient-view-task.component';

describe('PatientViewTaskComponent', () => {
  let component: PatientViewTaskComponent;
  let fixture: ComponentFixture<PatientViewTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientViewTaskComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientViewTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
