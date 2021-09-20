
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  user: any;

  constructor(
    private http:HttpClient
  ) { }


  authenticateUser(user): Observable<any>{
    return this.http.post(`${environment.apiEndPoint}authenticate`,user)
  }

  getProfile(userId: any){
    if(!this.isAuthenticated()) {
      return;
    }
    return this.http.get(`${environment.apiEndPoint}${userId}/profile`)
    .pipe(map(res => res));
  }

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('id_token');
    const jwtHelper = new JwtHelperService();
    // Check if the token is expired and return true or false
    return !jwtHelper.isTokenExpired(token);
  }

  storeUserData(token, user){
    localStorage.setItem('id_token', token); //angular jwt looks for this "id" path automatically
    localStorage.setItem('user', JSON.stringify(user)); //local storage can only store string
    this.authToken = token;
    this.user = user;
  }

  public getToken(): string {
    return localStorage.getItem('id_token');
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
