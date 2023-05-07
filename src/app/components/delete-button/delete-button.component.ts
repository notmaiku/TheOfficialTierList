import { Component, Input } from '@angular/core';
import { DeleteListGQL, DeleteListMutation, DeleteTiersWithListGQL, DeleteTiersWithListMutation  } from 'graphql/generated';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-delete-button',
  template:`
            <button class="btn btn-circle"  [class]="float" (click)="clicked()">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
`
,
  styleUrls: ['./delete-button.component.css']
})
export class DeleteButtonComponent {
  @Input() listId!: number;
  @Input() float!: string;

  delTiers$!: Observable<DeleteTiersWithListMutation['deleteTiers']>
  delList$!: Observable<DeleteListMutation['deleteList']>

  constructor(private userS: UserService, private delTGQL: DeleteTiersWithListGQL, private delLGQL: DeleteListGQL){}
  clicked(){
    this.userS.delTrigger(this.listId);
    this.delTGQL.mutate({id: this.listId}).pipe().subscribe()
    this.delLGQL.mutate({id: this.listId}).pipe().subscribe()
    // this.tiersMutGQL.mutate({tiers: tierInput}).pipe().subscribe( () => this.submitted())

  }
}
