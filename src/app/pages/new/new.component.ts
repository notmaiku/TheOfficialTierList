import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '@auth0/auth0-spa-js';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ListService } from 'src/app/services/list.service';
import { TierService } from 'src/app/services/tier.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Tier } from 'src/app/Tier';

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
  tiers!: Tier[];
  private subscription: Subscription;
  private subscriptionTier: Subscription;
  private subscriptionRowCount!: Subscription;
  private submitTiers!: Subscription;
  private submitLists!: Subscription;
  submitted: Boolean = false;

  constructor(
    private user: UserService,
    private list: ListService,
    private tierService: TierService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.subscriptionRowCount = this.list
      .getRowCount()
      .subscribe((data) => (this.newTotalRow = Number(data) + 1));
    this.subscription = this.user.data$.subscribe(
      (data) => (this.userData = data)
    );
    this.subscriptionTier = this.tierService
      .getTiers(
        true,
        this.userData.sub?.split('|')[1] || '',
        this.route.snapshot.paramMap.get('1') || ''
      )
      .subscribe((data) => {
        data.forEach((t) => {
          t.list_id = String(this.newTotalRow);
        });
        this.tiers = data;
      });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.subscriptionTier.unsubscribe();
    this.subscriptionRowCount.unsubscribe();
    this.submitLists.unsubscribe();
    this.submitTiers.unsubscribe();
  }
  async validateAndSubmit() {
    if (this.title.length > 0 && this.game.length > 0 && this.tiers) {
      this.submitLists = this.list
        .createOneList({
          title: String(this.title),
          game: this.unwrap(this.game),
          user_id: this.unwrap(this.userData.userId.split('|')[1]),
        })
        .subscribe();
      this.submitTiers = this.tierService.createTiers(this.tiers).subscribe();
      this.submitted = true;
    } else {
      console.log('failed list');
    }
  }
  unwrap(val: any): any {
    return val ? val : 'undefined';
  }
}
