import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// Custom validator for file extension
export function fileExtensionValidator(validExt: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const file: File = control.value;
        if (file) {
            const fileString = (file as unknown as String); // TODO: this is so hacky. try to find an alternative... but file.name returns undefined as well as file.type??
            const extension = fileString.split('.').pop();
            if (extension?.toLowerCase() !== validExt.toLowerCase()) {
                return { invalidExt: true };
            }
        }
        return null;
    };
}

// Custom validator for function name
export function functionNameValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const functionName: string = control.value;
        const pattern = /^[a-z]+$/i;
        if (!pattern.test(functionName)) {
            return { invalidFunctionName: true };
        }
        return null;
    };
}
