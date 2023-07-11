import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { BookingDetail } from '../api/booking-detail';

@Injectable({
  providedIn: 'root'
})
export class BookingDetailService {

  constructor(private http: HttpClient) { }

  urlApi = "http://localhost:3000/bookingdetail"

  getHistoryBookingWithCustomer(id: string): Observable<BookingDetail[]> {
    return this.http.get<BookingDetail[]>(`${this.urlApi}?customerId=${id}`)
      .pipe(
        catchError((err) => {
          console.error(err);
          //Handle the error here
          return throwError(err);    //Rethrow it back to component
        })
      )
  }
}
