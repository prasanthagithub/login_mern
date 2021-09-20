import { AuthService } from './../../services/auth.service';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn:'root'
})

export class AuthInterceptor implements HttpInterceptor {
  //Http Interceptor which checks on the api call and will add authorization token to it;
  private authService: AuthService

  constructor(authService: AuthService) {
    Object.assign(this, { authService });
  }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    req = req.clone({
      setHeaders: {
        'Authorization': `Bearer ${this.authService.getToken()}`,
      },
    });
    return next.handle(req);
  }
}


     // 'Content-Type' : 'application/json; charset=utf-8',
   // 'Accept'       : 'application/json',
