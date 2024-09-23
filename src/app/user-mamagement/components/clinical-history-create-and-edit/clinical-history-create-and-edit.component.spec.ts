import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicalHistoryCreateAndEditComponent } from './clinical-history-create-and-edit.component';

describe('ClinicalHistoryCreateAndEditComponent', () => {
  let component: ClinicalHistoryCreateAndEditComponent;
  let fixture: ComponentFixture<ClinicalHistoryCreateAndEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClinicalHistoryCreateAndEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClinicalHistoryCreateAndEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
