import { Injectable } from '@angular/core';
import { Tier } from '../Tier'
import { Observable} from 'rxjs';
import {HttpClient, HttpHeaders } from '@angular/common/http'

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class TierService {
  private apiUrl = 'http://localhost:3000/tiers'
  constructor(private http: HttpClient) { }

  getTiers(): Observable<Tier[]>{
    const data = this.http.get<Tier[]>(this.apiUrl).pipe()
    return data
  }
  deleteTiers(tier: Tier): Observable<Tier>{
    const url = `${this.apiUrl}/${tier.id}`
    return this.http.delete<Tier>(url);
  }
  addTier(tier: Tier): Observable<Tier>{
    return this.http.post<Tier>(this.apiUrl, tier, httpOptions);
  }
}
