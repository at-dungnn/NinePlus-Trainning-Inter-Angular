import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { a } from '@fullcalendar/core/internal-common';
import { BehaviorSubject, map, Observable, Subject } from 'rxjs';
import { CrudBaseService } from 'src/app/core';
import { Employee, EmployeeCreate, EmployeeUpdate } from 'src/app/demo/api/employee';

@Injectable({
    providedIn: 'root',
})
export class EmployeeService extends CrudBaseService {
    private _employeeSubject: BehaviorSubject<any>;
    private subject = new Subject<any>();
    token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6InN1cGVyYWRtaW4iLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJsZWhpZXUucXJ0QGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJOZ3V5ZW4gUGh1b2MgTGUgSGlldSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiU3VwZXJhZG1pbiIsImV4cCI6MTY4OTY4MzQzNn0.BXQtx-He8ohJTik_akr8FdisNoxBW0n_PZ8qF9rhcjM';
    URL = 'http://119.82.130.211:6060/api/v1/employee';
    dataEmployee$: Observable<any>;
    constructor(private _httpClient: HttpClient) {
        super('employee', _httpClient);
        this._employeeSubject = new BehaviorSubject<any>({});
        this.dataEmployee$ = this._employeeSubject.asObservable();
    }
    sendClickEvent() {
        this.subject.next(event);
    }
    getClickEvent(): Observable<any> {
        return this.subject.asObservable();
    }

    getListEmployee(): Observable<any> {
        return this.list();
    }

    getEmployeeById(id: string): Observable<any> {
        return this.get(id);
    }

    deleteEmployeeById(id: string): Observable<Employee> {
        return this.delete(id, 'id');
    }

    updateEmployeeById(employee: EmployeeUpdate): Observable<EmployeeUpdate> {
        return this.updateEmployee(employee);
    }

    createEmployee(employee: EmployeeCreate): Observable<EmployeeCreate> {
        return this.create(employee);
    }
}
