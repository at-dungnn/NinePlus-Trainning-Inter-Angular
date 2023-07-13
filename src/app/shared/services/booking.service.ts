import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { CrudBaseService } from 'src/app/core';
import { ApiResponse } from 'src/app/core/http/api-response';

@Injectable({
    providedIn: 'root',
})
export class BookingService extends CrudBaseService {
    private _bookingSubject: BehaviorSubject<any>;
    private subject = new Subject<any>();
    dataBooking$: Observable<any>;

    constructor(private _httpClient: HttpClient) {
        super('booking', _httpClient);
        this._bookingSubject = new BehaviorSubject<any>({});
        this.dataBooking$ = this._bookingSubject.asObservable();
    }

    sendClickEvent() {
        this.subject.next(event);
    }

    getClickEvent(): Observable<any> {
        return this.subject.asObservable();
    }

    getHistoryBooking(id: string): Observable<ApiResponse> {
        return this._httpClient.get(`${this.basePath}/customer/${id}`);
    }

}
