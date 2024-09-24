import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiologicalFormComponent } from './biological-form.component';

describe('BiologicalFormComponent', () => {
  let component: BiologicalFormComponent;
  let fixture: ComponentFixture<BiologicalFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BiologicalFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BiologicalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
