import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiologicalFunctionsEntryComponent } from './biological-functions-entry.component';

describe('BiologicalFunctionsEntryComponent', () => {
  let component: BiologicalFunctionsEntryComponent;
  let fixture: ComponentFixture<BiologicalFunctionsEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BiologicalFunctionsEntryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BiologicalFunctionsEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
