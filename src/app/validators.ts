import { AbstractControl, ValidatorFn } from "@angular/forms";

export function ageValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        if (!control.value) {
            return null;
        }
        const isValid = !isNaN(parseFloat(control.value)) && isFinite(control.value) && control.value > 0;
        return isValid ? null : { 'invalidAge': 'Enter a valid positive number' }
    };
}

export function phoneNumberValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const regexp = /^[- +()0-9]+$/;

        if (!control.value) {
            return null;
        }

        const isValid = control.value && regexp.test(control.value);
        return isValid ? null : { 'invalidPhoneNumber': 'Enter a valid phone number' }
    };
}

export function emailValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const regexp = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;

        const isValid = control.value && regexp.test(control.value);

        return isValid ? null : { 'invalidEmail': 'Enter a valid email' };
    };
}

export function requiredValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const isValid = control.value && control.value.toString().trim().length > 0;
        return isValid ? null : { 'required': 'This field is required' }
    };
}

export function minLength(min: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const isValid = control.value && control.value.toString().trim().length >= min;
        return isValid ? null : { 'minLength': `Enter at least ${min} characters` }
    };
}

export function maxLength(max: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        if (!control.value) {
            return null;
        }
        const isValid = control.value && control.value.toString().trim().length <= max;
        return isValid ? null : { 'maxLength': `Enter at most ${max} characters` }
    };
}

export function passwordValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const errors = [];
        const value = control.value;

        // Check minimum length
        if (value.length < 8) {
            errors.push('min 8 chars');
        }

        // Check for lowercase letter
        if (!/[a-z]/.test(value)) {
            errors.push('1 lowercase');
        }

        // Check for uppercase letter
        if (!/[A-Z]/.test(value)) {
            errors.push('1 uppercase');
        }

        // Check for digit
        if (!/\d/.test(value)) {
            errors.push('1 digit');
        }

        // If there are errors, return the concatenated error message; otherwise, return null
        return errors.length > 0 ? { 'invalidPassword': `Needs: ${errors.join(', ')}.` } : null;
    };
}