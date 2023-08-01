import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { ApiBaseService } from '../http/crud.service';
import { ROUTER, UserAuthenticate } from 'src/app/shared';
import { SessionKey, SessionService } from './session.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticateService extends ApiBaseService {
    constructor(public override httpClient: HttpClient, private _sessionService: SessionService, private _router: Router) {
        super(httpClient);
    }

    login(employeeNo: string, password: string): Observable<any> {
        return this.httpClient
            .post(this.apiBasePath + '/api/identity/token', {
                employeeNo: employeeNo,
                password: password,
            })
            .pipe(
                tap((res: any) => {
                    const authInfor = res.data as UserAuthenticate;
                    this._sessionService.saveUserAuthenticate(authInfor);
                    this._sessionService.userAuthenticate = JSON.parse(localStorage.getItem(SessionKey.USER)!) as UserAuthenticate;
                })
            );
    }
    sendMailForGot(body: any): Observable<any> {
        return this.httpClient.post(this.apiBasePath + '/api/account/forgot-password', body);
    }

    resestPasword(body: any): Observable<any> {
        return this.httpClient.post(this.apiBasePath + '/api/account/reset-password', body);
    }

    logOut(): void {
        this._sessionService.userAuthenticate && localStorage.removeItem('USER');
        this._router.navigateByUrl(ROUTER.LANDING);
    }

    changePassword(body: any): Observable<any> {
        return this.httpClient.post(this.apiBasePath + '/api/account/change-password', body);
    }
}
