import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { tap } from "rxjs/internal/operators/tap";
import { catchError } from "rxjs/operators";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class ChitsService {
  constructor(private http: HttpClient) {}
  URL = environment.apiURL + "/chit/api/v1/chit/";
  getChittiURL = "user/";
  TOKEN = "5e9c17036bf4e37664eba7a6";

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };

  getChittiDetails(): Observable<any> {
    return this.http.get(this.URL + this.getChittiURL + this.TOKEN);
  }
  getChit(token): Observable<any> {
    return this.http.get(this.URL + token);
  }
  postChitti(data): Observable<any> {
    return this.http.post(this.URL, data).pipe();
  }
  updateChit(data): Observable<any> {
    return this.http.put(this.URL, data).pipe();
  }
  deleteChit(id) {
    return this.http.delete(this.URL + id);
  }
  getChits(query) {
    return this.http.post(
      environment.apiURL + "/chit/api/v1/chit/query",
      query
    );
  }
  searchMember(data): Observable<any> {
    return this.http
      .post(environment.apiURL + "/chit/api/v1/user/query", data)
      .pipe(
        tap((result) => result),
        catchError((error) => throwError(error))
      );
  }
}
