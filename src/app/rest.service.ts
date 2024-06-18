import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) {}

  get(url: string): Observable<any> {
    return this.http.get("http://localhost:5050/" + url, {
      headers: {'Content-Type': 'application/json'}
    });
  }

  post(url: string, obj: any): Observable<any> {
    return this.http.post("http://localhost:5050/" + url, obj, {
      headers: {'Content-Type': 'application/json'}
    });
  }

  getEdit(url: string): Observable<any> {
    return this.http.get("http://localhost:5050/" + url, {
      headers: {'Content-Type': 'application/json'}
    });
  }


  put(url: string, obj: any): Observable<any> {
    return this.http.put("http://localhost:5050/" + url, obj, {
      headers: {'Content-Type': 'application/json'}
    });
  }

  delete(url: string): Observable<any> {
    return this.http.delete("http://localhost:5050/" + url, {
      headers: {'Content-Type': 'application/json'}
    });
  }
}
