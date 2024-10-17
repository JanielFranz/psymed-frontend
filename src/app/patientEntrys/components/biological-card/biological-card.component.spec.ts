import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiologicalCardComponent } from './biological-card.component';

describe('BiologicalCardComponent', () => {
  let component: BiologicalCardComponent;
  let fixture: ComponentFixture<BiologicalCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BiologicalCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BiologicalCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
