import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse,
} from '@angular/common/http';
import { isNil, isEmpty } from 'lodash';
import { Observable, EMPTY, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { SessionService } from '../services';

@Injectable()
export class AuthTokenHeaderInterceptor implements HttpInterceptor {
    constructor(
        private sessionService: SessionService,
        private router: Router
    ) {}

    private handleAuthError(err: HttpErrorResponse): Observable<any> {
        if (err.status === 403 && !this.router.url.endsWith('/auth/login')) {
            this.sessionService.destroySession();
            this.router.navigate(['/', 'auth', 'login'], {
                queryParams: { returnUrl: this.router.url },
            });
            return EMPTY;
        }

        return throwError(err);
    }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        const accessToken = this.sessionService.userAccessToken;
        if (
            !isNil(accessToken) &&
            !isEmpty(accessToken) &&
            isNil(request.headers.get('is-external'))
        ) {
            request = request.clone({
                setHeaders: { Authorization: 'Bearer ' + accessToken },
            });
            return next
                .handle(request)
                .pipe(catchError((err) => this.handleAuthError(err)));
        } else {
            return next.handle(request);
        }
    }
}
