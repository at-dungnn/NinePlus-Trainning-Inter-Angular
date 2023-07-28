import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ResetPasswordComponent } from './resetpassword.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: ResetPasswordComponent,
            },
        ]),
    ],
    exports: [RouterModule],
})
export class ResetPasswordRoutingModule {}
