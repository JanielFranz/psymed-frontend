import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicalHistoryTextComponent } from './clinical-history-text.component';

describe('ClinicalHistoryTextComponent', () => {
  let component: ClinicalHistoryTextComponent;
  let fixture: ComponentFixture<ClinicalHistoryTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClinicalHistoryTextComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClinicalHistoryTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
