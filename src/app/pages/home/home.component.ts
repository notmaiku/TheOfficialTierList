import { Component, OnDestroy, OnInit } from '@angular/core';
import { TierService } from 'src/app/services/tier.service';
import { TierColorService } from 'src/app/services/tier-color.service';
import { Subscription, map } from 'rxjs';
import { Color } from 'src/app/Color';
import { Tier } from 'src/app/Tier';
import { AuthService } from '@auth0/auth0-angular';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/User';
import { TiersByListGQL, TiersByListQuery, TiersGQL, TiersQuery } from 'graphql/generated';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private subscription?: Subscription;
  tierList: String[] = ['S', 'A', 'B', 'C', 'D', 'E'];
  listId = 1;
  tierUserId = 'all';
  tierChanged: Tier[] = [];
  public colorStream$ = this.colorService.getTiers();
  colorData!: Color[];
  tierData!: Tier[];
  authenticated = false;
  userName: string | undefined;
  picture?: string;
  constructor(
    private tierService: TierService,
    private colorService: TierColorService,
    public auth: AuthService,
    private user: UserService,
    private tiersGQL: TiersByListGQL
  ) {}
  colorPipe$ = this.colorStream$.pipe();
  userPipe$ = this.user.getUserInfo().pipe();
  submitStatus: String = '#C7C7C7';
  id: any;
  tiers$!: Observable<TiersByListQuery['getAllTiers']>;
  ngOnInit(): void {
    this.colorData = [{ name: 'primary', start: '#000000', end: '#000000' }];
    this.auth.idTokenClaims$.subscribe((claims) => {
      if (claims) {
        this.authenticated = true;
        this.userName = claims['name'];
        this.id = claims['sub'];
        this.picture = claims['picture'];
        let userData: User = {
          loggedIn: true,
          userId: this.unwrap(this.id),
          name: this.unwrap(this.userName),
          picture: this.unwrap(this.picture),
        };
        this.user.next(userData);
        localStorage.setItem('user_local', JSON.stringify(userData));
      } else {
        this.authenticated = false;
        this.userName = '';
        // localStorage.removeItem('user_local');
      }
    });
    this.tiers$ = this.tiersGQL
      .watch({listId: this.listId})
      .valueChanges.pipe(map((result) => result.data.getAllTiers));
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  onDropChange(event: Tier) {
    this.tierChanged = [...this.tierChanged, event];
    let unSaved = (this.submitStatus = '#f87171');
  }
  onSubmit() {
    if (this.tierChanged.length === 0) return;
    let submittedToServer = (this.submitStatus = '#facc15');
    this.tierService
      .updateTiers(this.tierChanged)
      .subscribe(() => this.submitted());
  }

  submitted() {
    let successSubmition = (this.submitStatus = '#4ade80');
    setTimeout(() => {
      let backToDefault = (this.submitStatus = '#C7C7C7');
    }, 2000);
  }
  unwrap(val: any): any {
    return val ? val : 'undefined';
  }
}
