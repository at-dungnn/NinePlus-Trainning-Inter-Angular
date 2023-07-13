import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { isNil } from 'lodash';


@Injectable()
export class ExternalApiInterceptor implements HttpInterceptor {
    constructor() { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (!isNil(request.headers.get('is-external'))) {

            request = request.clone({
                headers: request.headers.delete('is-external')
            });
        }
        return next.handle(request);
    }
}
