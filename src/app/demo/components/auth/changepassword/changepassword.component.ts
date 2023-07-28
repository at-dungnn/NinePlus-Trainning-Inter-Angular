import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-changepassword',
    templateUrl: './changepassword.component.html',
    styleUrls: ['./changepassword.component.scss'],
})
export class ChangePasswordComponent {
    constructor(
        private _router: Router,
        private _activatedRoute: ActivatedRoute
    ) {
        console.log(this._router.getCurrentNavigation()?.extras.state);
    }

    ngOnInit(): void {
    }

}
