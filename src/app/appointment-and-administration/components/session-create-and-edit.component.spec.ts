import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionCreateAndEditComponent } from './session-create-and-edit.component';

describe('SessionCreateAndEditComponent', () => {
  let component: SessionCreateAndEditComponent;
  let fixture: ComponentFixture<SessionCreateAndEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessionCreateAndEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SessionCreateAndEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
