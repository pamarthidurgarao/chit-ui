import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  baseUrl = "https://chit-services.herokuapp.com";

  constructor(private http: HttpClient) { }

  getRequests(query) {
    return this.http.post(this.baseUrl + "/chit/api/v1/chitRequest/query", query);
  }

  requestAction(id, status) {
    return this.http.post(this.baseUrl + "/chit/api/v1/chitRequest/action/" + id + "?status=" + status, {});
  }

  createRequest(data) {
    return this.http.post(this.baseUrl + "/chit/api/v1/chitRequest", data);
  }
}
