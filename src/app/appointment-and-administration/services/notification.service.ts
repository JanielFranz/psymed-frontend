import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private newAppointmentsCounter = new BehaviorSubject<number>(0); // Tracks the number of new appointments

  // Observable to expose the count of new appointments
  newAppointmentsCount$ = this.newAppointmentsCounter.asObservable();

  // Increment the counter when a new appointment is created
  incrementCounter() {
    this.newAppointmentsCounter.next(this.newAppointmentsCounter.value + 1);
  }

  // Reset the counter to 0 when the user views the appointments
  resetCounter() {
    this.newAppointmentsCounter.next(0);
  }

  // Get the current value of the counter
  getCurrentCount(): number {
    return this.newAppointmentsCounter.value;
  }
}
