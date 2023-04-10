import { Component, Input, OnInit } from '@angular/core';
import { TierService } from 'src/app/services/tier.service';
import { TierColorService } from 'src/app/services/tier-color.service';
import { map } from 'rxjs';
import { Color } from 'src/app/Color';
import { Tier } from 'src/app/Tier';
import { AuthService, User } from '@auth0/auth0-angular';
import { env } from 'env/enviroment';
import { UserService } from 'src/app/services/user.service';
import { TiersComponent } from '../tiers/tiers.component';

@Component({
  selector: 'app-tier-list',
  templateUrl: './tier-list.component.html',
  styleUrls: ['./tier-list.component.css'],
})
export class TierListComponent implements OnInit {
  @Input() tierData!: Tier[];
  @Input() userId?: String;
  tierList: String[] = ['S', 'A', 'B', 'C', 'D', 'E'];
  tierChanged: Tier[] = [];
  colorData!: Color[];
  userPipe$ = this.user.getUserInfo().pipe();

  constructor(
    private colorService: TierColorService,
    private auth: AuthService,
    private user: UserService,
    private tierService: TierService 

  ) {
  }
  submitStatus: String = '#C7C7C7';
  id: any;
  ngOnInit(): void {
    this.colorData = [{ name: 'primary', start: '#000000', end: '#000000' }];
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
  removeProv(id: String){
    return id.split("|")[1]
  }

  hasAccess(id: String){
    const curUser = this.removeProv(id)
    return (this.userId === "all" ||this.userId === curUser ) ? true : false;
  }
}
