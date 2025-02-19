import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicalViewComponent } from './clinical-view.component';

describe('ClinicalViewComponent', () => {
  let component: ClinicalViewComponent;
  let fixture: ComponentFixture<ClinicalViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClinicalViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClinicalViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
