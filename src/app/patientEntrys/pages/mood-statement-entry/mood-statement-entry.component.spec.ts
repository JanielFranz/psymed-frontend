import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoodStatementEntryComponent } from './mood-statement-entry.component';

describe('MoodStatementEntryComponent', () => {
  let component: MoodStatementEntryComponent;
  let fixture: ComponentFixture<MoodStatementEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoodStatementEntryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoodStatementEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
