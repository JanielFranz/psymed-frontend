import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiologicalListComponent } from './biological-list.component';

describe('BiologicalListComponent', () => {
  let component: BiologicalListComponent;
  let fixture: ComponentFixture<BiologicalListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BiologicalListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BiologicalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
