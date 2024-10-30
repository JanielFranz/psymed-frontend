import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicationEditModalComponent } from './medication-edit-modal.component';

describe('MedicationEditModalComponent', () => {
  let component: MedicationEditModalComponent;
  let fixture: ComponentFixture<MedicationEditModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedicationEditModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicationEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
