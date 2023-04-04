import { Injectable } from '@angular/core';
import { Tier } from '../Tier'
import { catchError, Observable, throwError} from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import {env} from '../../../env/enviroment'
@Injectable({
  providedIn: 'root'
})
export class TierService {
  
  private baseUrl = env.baseurl

  private apiUrl = `${this.baseUrl}/bloons/tiers`;
  private updateMultipleUrl = `${this.baseUrl}/tiers/update`;
  constructor(private http: HttpClient) { }

  getTiers(): Observable<Tier[]>{
  console.log('base',this.baseUrl)
    const data = this.http.get<Tier[]>(this.apiUrl).pipe()
    return data
  }
  deleteTiers(tier: Tier): Observable<Tier>{
    const url = `${this.apiUrl}/${tier.id}`
    return this.http.delete<Tier>(url);
  }
  addTier(tier: Tier): Observable<Tier>{
    return this.http.post<Tier>(this.apiUrl, tier);
  }
  updateTiers(tiers: Tier[]): Observable<Tier[]>{
    return this.http.put<Tier[]>(this.updateMultipleUrl, tiers)
  }

  private handleError(error: HttpErrorResponse) {
  if (error.status === 0) {
    console.error('An error occurred:', error.error);
  } else {
    console.error(
      `Backend returned code ${error.status}, body was: `, error.error);
  }
  return throwError(() => new Error('Something bad happened; please try again later.'));
}
}
