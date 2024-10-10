import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionalCreateTaskComponent } from './professional-create-task.component';

describe('ProfessionalCreateTaskComponent', () => {
  let component: ProfessionalCreateTaskComponent;
  let fixture: ComponentFixture<ProfessionalCreateTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfessionalCreateTaskComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfessionalCreateTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
