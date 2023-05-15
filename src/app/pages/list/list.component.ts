import { Component, Input, OnInit } from '@angular/core';
import { TierService } from 'src/app/services/tier.service';
import { TierColorService } from 'src/app/services/tier-color.service';
import { Observable, map } from 'rxjs';
import { Color } from 'src/app/Color';
import { Tier } from 'src/app/Tier';
import { AuthService, User } from '@auth0/auth0-angular';
import { env } from 'env/enviroment';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { TiersByListGQL, TiersByListQuery } from 'graphql/generated';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  @Input() userId?: String;
  listId!: number;
  tierList: String[] = ['S', 'A', 'B', 'C', 'D', 'E'];
  tierChanged: Tier[] = [];
  public tierStream$ = this.tierService.getTiers(
    false,
    env.officialId,
    this.route.snapshot.paramMap.get('list_id') || ''
  );
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
    private route: ActivatedRoute,
    private tiersGQL: TiersByListGQL
  ) {
  }
  colorPipe$ = this.colorStream$.pipe();
  tierPipe$ = this.tierStream$.pipe();
  userPipe$ = this.user.getUserInfo().pipe();
  tiers$!: Observable<TiersByListQuery['getAllTiers']>;
  submitStatus: String = '#C7C7C7';
  id: any;
  ngOnInit(): void {
    this.listId = Number(this.route.snapshot.paramMap.get('list_id')) || 0
    this.colorData = [{ name: 'primary', start: '#000000', end: '#000000' }];
    this.tiers$ = this.tiersGQL
      .watch({listId: this.listId})
      .valueChanges.pipe(map((result) => result.data.getAllTiers));
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
