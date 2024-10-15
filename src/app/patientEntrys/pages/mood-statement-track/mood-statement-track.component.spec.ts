import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoodStatementTrackComponent } from './mood-statement-track.component';

describe('MoodStatementTrackComponent', () => {
  let component: MoodStatementTrackComponent;
  let fixture: ComponentFixture<MoodStatementTrackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoodStatementTrackComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoodStatementTrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
