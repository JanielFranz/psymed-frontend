import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosticEditViewComponent } from './diagnostic-edit-view.component';

describe('DiagnosticEditViewComponent', () => {
  let component: DiagnosticEditViewComponent;
  let fixture: ComponentFixture<DiagnosticEditViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiagnosticEditViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiagnosticEditViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
