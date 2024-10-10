import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionalViewTaskComponent } from './professional-view-task.component';

describe('ProfessionalViewTaskComponent', () => {
  let component: ProfessionalViewTaskComponent;
  let fixture: ComponentFixture<ProfessionalViewTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfessionalViewTaskComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfessionalViewTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
