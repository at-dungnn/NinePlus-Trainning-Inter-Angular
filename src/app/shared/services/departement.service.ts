import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { CrudBaseService } from 'src/app/core';
import { Departement } from '../models/departement';
@Injectable({
    providedIn: 'root',
})
export class DepartementService extends CrudBaseService {
    private subject = new Subject<any>();
    constructor(private _httpClient: HttpClient) {
        super('departments', _httpClient);
    }
    sendClickEvent() {
        this.subject.next(event);
    }
    getClickEvent(): Observable<any> {
        return this.subject.asObservable();
    }
    getListDepartement(): Observable<any[]> {
        return this._httpClient.get<any[]>(this.basePath);
    }
    postDepartment(departement: Departement): Observable<any> {
        return this._httpClient.post<Departement>(this.basePath, departement);
    }
    deleteDepartment(id: string): Observable<Departement> {
        return this._httpClient.delete<Departement>(this.basePath + '/' + id);
    }
    putDepartment(departement: Departement): Observable<any> {
        return this._httpClient.put<Departement>(this.basePath, departement);
    }
    getDepartmentById(id: string): Observable<Departement> {
        return this._httpClient.get<Departement>(this.basePath + '/' + id);
    }
}