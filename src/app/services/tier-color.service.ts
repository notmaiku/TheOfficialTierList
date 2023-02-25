import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Color } from '../Color';
import { Observable, switchMap } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class TierColorService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:5000/bloonsColors'
  getTiers(): Observable<Color[]>{
    const data = this.http.get<Color[]>(this.apiUrl).pipe()
    return data
    
  }
}
