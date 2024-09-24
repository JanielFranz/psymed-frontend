import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicalHistoryFormComponent } from './clinical-history-form.component';

describe('ClinicalHistoryFormComponent', () => {
  let component: ClinicalHistoryFormComponent;
  let fixture: ComponentFixture<ClinicalHistoryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClinicalHistoryFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClinicalHistoryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
