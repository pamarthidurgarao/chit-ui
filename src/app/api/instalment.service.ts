import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class InstalmentService {
  URL = environment.apiURL + "/chit/api/v1/instalment";
  constructor(private http: HttpClient) {}

  createInstalment(data: any) {
    return this.http.post(this.URL, data);
  }

  getInstalmentByQuery(data: any) {
    return this.http.post(this.URL + "/query", data);
  }
}
