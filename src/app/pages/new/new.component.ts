import { Component, OnDestroy } from '@angular/core';
import { User } from '@auth0/auth0-spa-js';
import { Subscription, map, of } from 'rxjs';
import { FormGroup  } from '@angular/forms';
import { Tier } from 'src/app/Tier';
import {ListInput, TiersByListQuery, TiersByListGQL, TierInput, ListsQuery, CreateListMutation, CreateListGQL, CreateTiersWithIdGQL} from 'graphql/generated';
import { Observable, concatMap,switchMap } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css'],
})
export class NewComponent implements OnDestroy {
  createTierForm!: FormGroup;
  userData!: User;
  title: String = '';
  game: String = '';
  newTotalRow!: number;
  tiers!: TierInput[];
  tiersMake!: Tier[];
  private subscription: Subscription;
  private submitTiers!: Subscription;
  private submitLists!: Subscription;
  submitted: Boolean = false;
  totalRow$!: Observable<ListsQuery['getLists']>
  listCreate$!: Observable<CreateListMutation['createList']>
  getTiers$!: Observable<TiersByListQuery['getAllTiers']>
  constructor(
    private user: UserService,
    private clGQL: CreateListGQL,
    private ctGQL: CreateTiersWithIdGQL,
    private tGQL: TiersByListGQL
  ) {
    this.subscription = this.user.data$.subscribe(
      (data) => (this.userData = data)
    );
    this.getTiers$ = this.tGQL.watch({listId: 1}).valueChanges.pipe(map((res) =>res.data.getAllTiers));
    this.getTiers$.subscribe(d => { this.tiers = d });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  async validateAndSubmit() {
    if (this.title.length > 0 && this.game.length > 0 && this.tiers) {
        this.clGQL.mutate({listInput: {
          title: String(this.title),
          game: this.unwrap(this.game),
          userId: this.unwrap(this.userData.userId.split('|')[1]),
        } as ListInput}).pipe(
          switchMap((res) => of(res.data?.createList.id)),
          concatMap((listId) => this.tiers.map(t => ({ ...t, listId: listId } as Tier | TierInput[]))),
          switchMap((tiers) => this.ctGQL.mutate({ tiers: tiers }))
        ).subscribe()
      this.submitted = true;
    } else {
      console.log('failed list');
    }
  }
  unwrap(val: any): any {
    return val ? val : 'undefined';
  }
}
