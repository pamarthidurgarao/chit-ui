import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class CheepipataService {

    constructor(private http: HttpClient) { }

    url = "https://chit-services.herokuapp.com/chit/api/v1/chit/user/5e9c17036bf4e37664eba7a6";

    getChittiDetails(): Observable<any> {
        return this.http.get(this.url);
    }
}