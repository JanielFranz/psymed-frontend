import {FormGroup} from "@angular/forms";

/**
 * @class BaseFormComponent
 * @description
 * Base class for form components
 * @template T - Type of the form model
 * @method isInvalidFormControl - Check if a form control is invalid
 */
export class BaseFormComponent {
  /**
   * Validate a form control
   * @method isInvalidFormControl
   * @param form - The form group
   * @param controlName - The name of the control to validate
   * @protected
   * @returns boolean
   */
  protected isInvalidFormControl(form: FormGroup, controlName: string) {
    return form.controls[controlName].invalid
    && form.controls[controlName].touched;
  }

  /**
   * Get the error message for a form control
   * @method errorMessageForControl
   * @param controlName - The name of the control
   * @param errorKey - The error key
   * @private
   * @returns string
   */
  private errorMessageForControl(controlName: string, errorKey: string) {
    switch(errorKey) {
      case 'required': return `${ controlName } is required`;
      default: return `The field ${ controlName } is invalid`;
    }
  }

  /**
   * Get the error messages for a form control
   * @method getErrorMessagesForControl
   * @param form - The form group
   * @param controlName - The name of the control
   * @protected
   * @returns string
   */
  protected getErrorMessagesForControl(form: FormGroup, controlName: string) {
    const control = form.controls[controlName];
    let errorMessages = '';
    let errors = control.errors;
    if(!errors) return errorMessages;
    Object.keys(errors).forEach(errorKey => {
      errorMessages += this.errorMessageForControl(controlName, errorKey)
    });
    return errorMessages;
  }
}
