import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicalEditComponent } from './clinical-edit.component';

describe('ClinicalEditComponent', () => {
  let component: ClinicalEditComponent;
  let fixture: ComponentFixture<ClinicalEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClinicalEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClinicalEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
