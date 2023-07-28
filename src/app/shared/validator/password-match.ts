import { FormGroup } from '@angular/forms';
export class MatchPassword {
    static confirmedValidator(password: string, confirmPassword: string) {
        return (formGroup: FormGroup) => {
            const control = formGroup.controls[password];
            const matchingControl = formGroup.controls[confirmPassword];
            if (
                matchingControl.errors &&
                !matchingControl.errors['confirmedValidator']
            ) {
                return;
            }
            if (control.value !== matchingControl.value) {
                matchingControl.setErrors({ confirmedValidator: true });
            } else {
                matchingControl.setErrors(null);
            }
        };
    }
}
