import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = environment.apiURL;
  constructor(private http: HttpClient) { }

  searchMember(query) {
    return this.http.post(this.baseUrl + "/chit/api/v1/user/query", query);
  }

  createUser(data) {
    return this.http.post(this.baseUrl + "/chit/api/v1/user", data);
  }

  async searchUser(query) {
    let data = await this.http.post(this.baseUrl + "/chit/api/v1/user/query", query).toPromise();
    return data;
  }
}
