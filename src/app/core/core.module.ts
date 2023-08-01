import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticateService } from './services/authenticate.service';
import { AuthGuard } from './guards';
import { SessionService } from './services';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiDefaultHeaderInterceptor, AuthTokenHeaderInterceptor } from './interceptors';
import { ExternalApiInterceptor } from './interceptors/external-api.interceptor';

const interceptors = [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthTokenHeaderInterceptor,
        multi: true,
    },
    {
        provide: HTTP_INTERCEPTORS,
        useClass: ApiDefaultHeaderInterceptor,
        multi: true,
    },
    {
        provide: HTTP_INTERCEPTORS,
        useClass: ExternalApiInterceptor, // must be the last one
        multi: true,
    },
];

@NgModule({
    declarations: [],
    imports: [CommonModule],
    providers: [AuthenticateService, AuthGuard, SessionService, AuthTokenHeaderInterceptor, ...interceptors],
})
export class CoreModule {}
