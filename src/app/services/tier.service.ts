import { Injectable } from '@angular/core';
import { Tier } from '../Tier'
import { catchError, Observable, throwError} from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import {env} from '../../../env/enviroment'
import { AuthService, User } from '@auth0/auth0-angular';
@Injectable({
  providedIn: 'root'
})
export class TierService {
  
  private baseUrl = env.baseurl

  private apiUrl = `${this.baseUrl}/bloons/tiers`;
  private updateMultipleUrl = `${this.baseUrl}/tiers/update`;
  constructor(private http: HttpClient, private auth: AuthService) { }
// localhost:3000/lists/user/642bd7d3c156e8883ecbabba
  getTiers(official: boolean, userId: String, listId: String): Observable<Tier[]>{
    if(!official)return this.http.get<Tier[]>(`${this.baseUrl}/tiers/list/${listId}`).pipe()
    return              this.http.get<Tier[]>(`${this.baseUrl}/tiers/list/1`).pipe()
    
  }
  getList(official: boolean, listId: String): Observable<Tier[]>{
    if(official) this.http.get<Tier[]>(`${this.baseUrl}/lists/${listId}`).pipe()
    return this.http.get<Tier[]>(`${this.baseUrl}/list/${listId}`).pipe()
  }
  
  findByNameAndGame(name: String,game: String): Observable<Tier[]>{
    return this.http.get<Tier[]>(`${this.baseUrl}/lists/name/${name}/game/${game}`).pipe()
  }
  deleteTiers(listId: String): Observable<string>{
    const url = `${this.baseUrl}/tiers/list/${listId}`
    return this.http.delete<string>(url);
  }
  addTier(tier: Tier): Observable<Tier>{
    return this.http.post<Tier>(this.apiUrl, tier);
  }
  updateTiers(tiers: Tier[]): Observable<Tier[]>{
    return this.http.put<Tier[]>(this.updateMultipleUrl, tiers)
  }
  createTiers(tiers: Tier[]): Observable<Tier[]>{
    return this.http.post<Tier[]>(`${this.baseUrl}/tiers/multiple`, tiers)
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
