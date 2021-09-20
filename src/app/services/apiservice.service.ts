import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  constructor(private http:HttpClient) {
  }
  getRequst(urlpath):Observable<any>
  {
      return this.http.get(`${environment.apiEndPoint}${urlpath}`)
  }
  postFRequest(urlpath,body):Observable<any>
  {
      return this.http.post(`${environment.apiEndPoint}${urlpath}`,body)
  }
  putRequst(urlpath,id,body):Observable<any>
  {
      return this.http.put(`${environment.apiEndPoint}${urlpath}/${id}`,body)
  }
  deleteRequest(urlpath,id):Observable<any>
  {
      return this.http.delete(`${environment.apiEndPoint}${urlpath}/${id}`)
  }

}
