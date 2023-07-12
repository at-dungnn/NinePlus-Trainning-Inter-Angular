import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, Subject } from 'rxjs';
import { CrudBaseService } from 'src/app/core';
import { Employee } from 'src/app/demo/api/employee';

@Injectable({
    providedIn: 'root',
})
export class EmployeeService extends CrudBaseService {
    private _employeeSubject: BehaviorSubject<any>;
    private subject = new Subject<any>();
    dataEmployee$: Observable<any>;
    constructor(private _httpClient: HttpClient) {
        super('employees', _httpClient);
        this._employeeSubject = new BehaviorSubject<any>({});
        this.dataEmployee$ = this._employeeSubject.asObservable();
    }
    sendClickEvent() {
        this.subject.next(event);
    }
    getClickEvent(): Observable<any> {
        return this.subject.asObservable();
    }



    getList(): Observable<any> {
        return this.list();
    }

    deleteById(id: string, key: string): Observable<any> {
        return this.delete(id, key);
    }

    getById(id: string): Observable<Employee> {
        return this.get(id);
    }

    updateById(employee: Employee): Observable<Employee>{
        return this.update(employee);
    }

    createEmployee(employee: Employee): Observable<Employee>{
        return this.create(employee);
    }
}
