import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {LoginRequest} from "../models/login-request";
import {LoginResponse} from "../models/login-response";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loginUrl = 'https://aitsi-timeline.herokuapp.com/public/index.php/login'

  constructor(private httpClient: HttpClient) { }

  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(this.loginUrl, loginRequest);
  }
}
