import { FormGroup } from '@angular/forms';
export class FormatPhone {
    static formatValidator(phoneNumber: string) {
        return (formGroup: FormGroup) => {
            const control = formGroup.controls[phoneNumber];
            const value = String(control.value);
            const arr = ['84', '03', '09', '08', '05', '07'];
            let isCheck = false;
            if (value) {
                if (control.errors && !control.errors['formatPhoneValidator']) {
                    return;
                }
                for (let i = 0; i < arr.length; i++) {
                    if (value.startsWith(arr[i])) {
                        isCheck = true;
                        break;
                    }
                }
                if (isCheck) {
                    control.setErrors(null);
                } else {
                    control.setErrors({ formatPhoneValidator: true });
                }
            }
        };
    }
}
