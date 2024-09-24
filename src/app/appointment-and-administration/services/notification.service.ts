import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private newAppointmentsCounter: BehaviorSubject<number>;
  public newAppointmentsCount$;

  constructor() {
    // Initialize the counter with the value from localStorage or default to 0
    const storedCount = localStorage.getItem('newAppointmentsCounter');
    const initialCount = storedCount ? parseInt(storedCount, 10) : 0;

    // Initialize the BehaviorSubject inside the constructor
    this.newAppointmentsCounter = new BehaviorSubject<number>(initialCount);

    // Initialize the observable
    this.newAppointmentsCount$ = this.newAppointmentsCounter.asObservable();
  }

  // Increment the counter and persist to localStorage
  incrementCounter() {
    const currentCount = this.newAppointmentsCounter.value;
    const newCount = currentCount + 1;

    // Update BehaviorSubject and localStorage
    this.newAppointmentsCounter.next(newCount);
    localStorage.setItem('newAppointmentsCounter', newCount.toString());
  }

  // Reset the counter and persist to localStorage
  resetCounter() {
    this.newAppointmentsCounter.next(0);
    localStorage.setItem('newAppointmentsCounter', '0');
  }

  // Get the current counter value (for debugging or other purposes)
  getCurrentCount(): number {
    return this.newAppointmentsCounter.value;
  }
}
