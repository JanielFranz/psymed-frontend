import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicalFormComponent } from './clinical-form.component';

describe('ClinicalFormComponent', () => {
  let component: ClinicalFormComponent;
  let fixture: ComponentFixture<ClinicalFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClinicalFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClinicalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
