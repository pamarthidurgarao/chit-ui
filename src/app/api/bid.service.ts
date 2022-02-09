import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class BidService {
  baseUrl = environment.apiURL;

  constructor(private http: HttpClient) {}

  loadBids(query) {
    return this.http.post(this.baseUrl + "/chit/api/v1/bid/query", query);
  }
  createBid(data) {
    return this.http.post(this.baseUrl + "/chit/api/v1/bid", data);
  }

  deleteBid(id) {
    return this.http.delete(this.baseUrl + "/chit/api/v1/bid/" + id);
  }
}
