import { Injectable } from '@angular/core';
import { UserAuthenticate } from 'src/app/shared';
import { BehaviorSubject, Observable } from 'rxjs';

export class SessionKey {
    static CURRENT_SELECT_LANG = 'CURRENT_SELECT_LANG';
    static UKEY = 'UKEY';
    static ROLE = 'ROLE';
    static USER = 'USER';
}

@Injectable()
export class SessionService {
    private _currentUserSubject: BehaviorSubject<any>;
    private _currentLangSubject: BehaviorSubject<any>;
    currentUser$: Observable<UserAuthenticate>;
    currentLang$: Observable<string>;
    userAuthenticate: UserAuthenticate;

    constructor() {
        this.userAuthenticate = JSON.parse(localStorage.getItem(SessionKey.USER)!) as UserAuthenticate;
        this._currentUserSubject = new BehaviorSubject<UserAuthenticate>(this.userAuthenticate);
        this._currentLangSubject = new BehaviorSubject<string>('vn');
        this.currentUser$ = this._currentUserSubject.asObservable();
        this.currentLang$ = this._currentUserSubject.asObservable();
    }
    get userAccessToken(): string {
        return this.userAuthenticate && this.userAuthenticate.token;
    }
    get userRole(): string {
        return localStorage.getItem(SessionKey.ROLE)!;
    }
    get userInformation(): string {
        return localStorage.getItem(SessionKey.USER)!;
    }

    get currentLang(): string {
        const lang = localStorage.getItem(SessionKey.CURRENT_SELECT_LANG);
        // return !isNil(lang) ? lang! : this._localize.parser.currentLang;
        return 'VN';
    }

    saveUserAuthenticate(userAuthenticate: UserAuthenticate): void {
        localStorage.setItem(SessionKey.USER, JSON.stringify(userAuthenticate));
    }
    saveCurrentLang(language: string): void {
        localStorage.setItem(SessionKey.CURRENT_SELECT_LANG, language);
        this._currentLangSubject.next(language);
    }
    saveUserRole(uId: string): void {
        localStorage.setItem(SessionKey.ROLE, uId);
    }
    destroySession(): void {
        localStorage.clear();
    }
}
