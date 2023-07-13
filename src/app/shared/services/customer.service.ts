import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { CrudBaseService } from 'src/app/core';
import { ApiResponse } from 'src/app/core/http/api-response';
import { Customer } from 'src/app/demo/api/customer';

@Injectable({
    providedIn: 'root',
})
export class CustomerService extends CrudBaseService {
    private _customerSubject: BehaviorSubject<any>;
    private subject = new Subject<any>();
    dataCustomer$: Observable<any>;

    constructor(private _httpClient: HttpClient) {
        super('customer', _httpClient);
        this._customerSubject = new BehaviorSubject<any>({});
        this.dataCustomer$ = this._customerSubject.asObservable();
    }

    sendClickEvent() {
        this.subject.next(event);
    }

    getClickEvent(): Observable<any> {
        return this.subject.asObservable();
    }

    getListCustomer(): Observable<ApiResponse> {
        return this.list();
    }

    postCustomer(customer: Customer): Observable<ApiResponse> {
        return this.create(customer);
    }

    updateCustomer(customer: Customer): Observable<ApiResponse> {
        return this._httpClient.put(`${this.basePath}`, customer);
    }

    getCustomerById(id: string): Observable<ApiResponse> {
        return this.get(id);
    }

    deleteCustomer(id: string): Observable<ApiResponse> {
        return this.delete(id, 'id');
    }
}
