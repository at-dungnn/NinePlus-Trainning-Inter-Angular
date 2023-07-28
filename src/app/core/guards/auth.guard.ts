import { Injectable } from '@angular/core';
import { SessionService } from '../services';
import {
    Router,
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
} from '@angular/router';
import { ROUTER } from 'src/app/shared';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private sessionService: SessionService
    ) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean {
        if (
            this.sessionService.userAuthenticate &&
            this.sessionService.userAuthenticate.token
        ) {
            // logged in so return true
            return true;
        }

        this.router.navigate([]);
        return false;
    }

    private getReturnUrl(routerState: RouterStateSnapshot): string {
        // not logged in so redirect to login page with the return url
        if (
            routerState.url &&
            !routerState.url.startsWith('/auth') &&
            routerState.url !== '/'
        ) {
            return routerState.url;
        } else {
            return undefined!;
        }
    }
}
