import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class UiService {
  private showAddTier: boolean = false;
  private subject = new Subject<any>();
  constructor() { }

  toggleAddTier(): void{
    this.showAddTier = !this.showAddTier;
    this.subject.next(this.showAddTier);
  }

  onToggle():  Observable<any>{
    return  this.subject.asObservable();
  }
}
