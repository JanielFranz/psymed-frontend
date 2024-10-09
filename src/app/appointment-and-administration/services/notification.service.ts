import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * NotificationService to manage new appointment notifications.
 * This service uses a BehaviorSubject to track and manage the count of new appointments
 * and persists the count using localStorage.
 */
@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  //#region Attributes

  /**
   * @property {BehaviorSubject<number>} newAppointmentsCounter - A BehaviorSubject to track the count of new appointments.
   * Initialized with the value from localStorage or defaults to 0.
   */
  private newAppointmentsCounter: BehaviorSubject<number>;

  /**
   * @property {Observable<number>} newAppointmentsCount$ - Public observable to expose the current count of new appointments.
   */
  public newAppointmentsCount$;

  //#endregion

  //#region Constructor

  /**
   * Constructor to initialize the NotificationService.
   * It retrieves the count from localStorage (if available) and initializes the BehaviorSubject with it.
   */
  constructor() {
    // Retrieve the stored counter value from localStorage or default to 0
    const storedCount = localStorage.getItem('newAppointmentsCounter');
    const initialCount = storedCount ? parseInt(storedCount, 10) : 0;

    // Initialize the BehaviorSubject with the initial count
    this.newAppointmentsCounter = new BehaviorSubject<number>(initialCount);

    // Expose the observable for new appointments count
    this.newAppointmentsCount$ = this.newAppointmentsCounter.asObservable();
  }

  //#endregion

  //#region Methods

  /**
   * Increments the new appointments counter by 1 and persists the updated value to localStorage.
   */
  incrementCounter() {
    const currentCount = this.newAppointmentsCounter.value;
    const newCount = currentCount + 1;

    // Update BehaviorSubject and persist to localStorage
    this.newAppointmentsCounter.next(newCount);
    localStorage.setItem('newAppointmentsCounter', newCount.toString());
  }

  /**
   * Resets the new appointments counter to 0 and persists the reset value to localStorage.
   */
  resetCounter() {
    this.newAppointmentsCounter.next(0);
    localStorage.setItem('newAppointmentsCounter', '0');
  }

  /**
   * Retrieves the current counter value. Useful for debugging or other purposes.
   *
   * @returns {number} - The current count of new appointments.
   */
  getCurrentCount(): number {
    return this.newAppointmentsCounter.value;
  }

  //#endregion
}
