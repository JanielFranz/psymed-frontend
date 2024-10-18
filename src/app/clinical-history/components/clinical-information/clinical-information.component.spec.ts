import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicalInformationComponent } from './clinical-information.component';

describe('ClinicalInformationComponent', () => {
  let component: ClinicalInformationComponent;
  let fixture: ComponentFixture<ClinicalInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClinicalInformationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClinicalInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
