import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicalEditInformationComponent } from './clinical-edit-information.component';

describe('ClinicalEditInformationComponent', () => {
  let component: ClinicalEditInformationComponent;
  let fixture: ComponentFixture<ClinicalEditInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClinicalEditInformationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClinicalEditInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
