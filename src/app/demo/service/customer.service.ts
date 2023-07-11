import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '../api/customer';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CustomerService {

    constructor(private http: HttpClient) { }

    urlApi = "http://localhost:3000/customer"

    getListCustomer(): Observable<Customer[]> {
        return this.http.get<Customer[]>(this.urlApi)
            .pipe(
                catchError((err) => {
                    console.error(err.status);
                    //Handle the error here
                    return throwError(err);    //Rethrow it back to component
                })
            )
    }

    getCustomerById(id: string | undefined): Observable<Customer> {
        return this.http.get<Customer>(`${this.urlApi}/${id}`)
            .pipe(
                catchError((err) => {
                    console.error(err);
                    //Handle the error here
                    return throwError(err);    //Rethrow it back to component
                })
            )
    }

    postCustomer(customer: Customer): Observable<Customer> {
        return this.http.post<Customer>(this.urlApi, customer)
    }

    updateCustomer(customer: Customer): Observable<Customer> {
        return this.http.put<Customer>(`${this.urlApi}/${customer.id}`, customer)
    }

    deleteCustomer(id: string | undefined): Observable<any> {
        return this.http.delete(`${this.urlApi}/${id}`)
            .pipe(
                catchError((err) => {
                    console.log('error caught in service')
                    console.error(err.status);
                    //Handle the error here
                    return throwError(err);    //Rethrow it back to component
                }

                ))
    }

}
