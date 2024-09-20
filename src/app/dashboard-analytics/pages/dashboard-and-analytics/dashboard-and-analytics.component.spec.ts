import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAndAnalyticsComponent } from './dashboard-and-analytics.component';

describe('DashboardAndAnalyticsComponent', () => {
  let component: DashboardAndAnalyticsComponent;
  let fixture: ComponentFixture<DashboardAndAnalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardAndAnalyticsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardAndAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
