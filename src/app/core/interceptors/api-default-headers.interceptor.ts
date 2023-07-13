import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { isNil } from 'lodash';

@Injectable()
export class ApiDefaultHeaderInterceptor implements HttpInterceptor {
    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        const needAcceptHeader = isNil(request.headers.get('Accept'));
        const needContentTypeHeader = isNil(
            request.headers.get('Content-Type')
        );
        return next.handle(
            request.clone({
                setHeaders: {
                    ...(needAcceptHeader && { Accept: 'application/json' }),
                    ...(needContentTypeHeader && {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Headers': 'Content-Type',
                        'Access-Control-Allow-Methods': 'GET',
                        'Access-Control-Allow-Origin': '*',
                    }),
                },
            })
        );
    }
}
