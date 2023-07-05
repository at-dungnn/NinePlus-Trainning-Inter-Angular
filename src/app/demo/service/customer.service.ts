import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '../api/customer';

@Injectable({
    providedIn: 'root'
})
export class CustomerService {
    constructor(private http: HttpClient) { }
    getCustomer() {
        return this.http.get<any>('assets/demo/data/customers.json')
            .toPromise()
            .then(res => res.data as Customer[])
            .then(data => data);
    }
}
