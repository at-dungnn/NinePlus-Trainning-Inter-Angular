import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, Subject } from 'rxjs';
import { CrudBaseService } from 'src/app/core';
import { Employee, EmployeeUpdate, EmployeeCreate } from 'src/app/demo/api/employee';

@Injectable({
    providedIn: 'root',
})
export class EmployeeService extends CrudBaseService {
    private _employeeSubject: BehaviorSubject<any>;
    private subject = new Subject<any>();
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
        return this.updateByPut(employee);
    }

    createEmployee(employee: EmployeeCreate): Observable<EmployeeCreate> {
        return this.create(employee);
    }
}
