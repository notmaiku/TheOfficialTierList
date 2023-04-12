import { Injectable } from '@angular/core';
import { List } from '../List';
import {HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { env } from 'env/enviroment';



@Injectable({
  providedIn: 'root'
})
export class ListService {
  private baseUrl = env.baseurl;

  constructor(private http: HttpClient) { }

  getLists(official: boolean, userId: String): Observable<List[]>{
    if(official) this.http.get<List[]>(`${this.baseUrl}/lists/user/${userId}`).pipe()
    return this.http.get<List[]>(`${this.baseUrl}/lists/user/${userId}`).pipe()
  }

  createOneList(list: List): Observable<List>{
    return this.http.post<List>(`${this.baseUrl}/lists`, list);
  }
  getRowCount(): Observable<String>{
    return this.http.get<String>(`${this.baseUrl}/rows`)
  }
}


