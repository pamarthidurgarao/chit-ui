import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BidService {

  baseUrl = "https://chit-services.herokuapp.com";

  constructor(private http: HttpClient) { }

  loadBids(query) {
    return this.http.post(this.baseUrl + "/chit/api/v1/bid/query", query);
  }
  createBid(data) {
    return this.http.post(this.baseUrl + "/chit/api/v1/bid", data);
  }
}
