import { Component, OnInit } from '@angular/core';
import { TierService } from 'src/app/services/tier.service';
import { TierColorService } from 'src/app/services/tier-color.service';
import { map } from 'rxjs';
import { Color } from 'src/app/Color';
import { Tier } from 'src/app/Tier';
import { AuthService, User } from '@auth0/auth0-angular';
import { env } from 'env/enviroment';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  tierList: String[] = ['S', 'A', 'B', 'C', 'D', 'E'];
  listId = '1';
  tierChanged: Tier[] = [];
  public tierStream$ = this.tierService.getTiers(true, env.officialId, this.listId);
  public colorStream$ = this.colorService.getTiers();
  colorData!: Color[];
  userId = env.officialId;
  tierData!: Tier[];
  authenticated = false;
  userName: string | undefined;
  picture?: string;
  constructor(
    private tierService: TierService,
    private colorService: TierColorService,
    public auth: AuthService,
    private user: UserService
  ) {}
  colorPipe$ = this.colorStream$.pipe();
  tierPipe$ = this.tierStream$.pipe();
  userPipe$ = this.user.getUserInfo().pipe();
  submitStatus: String = '#C7C7C7';
  id: any;
  ngOnInit(): void {
    this.colorData = [{ name: 'primary', start: '#000000', end: '#000000' }];
  this.auth.idTokenClaims$.subscribe((claims) => {
      if (claims) {
        this.authenticated = true;
        this.userName = claims['name'];
        this.id = claims['sub'];
        this.picture = claims['picture'];
        this.user.next({loggedin: true, userid: this.unwrap(this.id), name: this.unwrap(this.userName), picture: this.unwrap(this.picture)})
        localStorage.setItem('uid', this.id);
        localStorage.setItem('username', this.userName ? this.userName : 'no username');
        localStorage.setItem('picture', this.picture ? this.picture : 'no picture');
        localStorage.setItem('loggedin', this.authenticated ? String(this.authenticated) : 'false');
      } else {
        this.authenticated = false;
        this.userName = '';
        localStorage.removeItem('uid');
        localStorage.removeItem('username');
        localStorage.removeItem('picture');
        localStorage.removeItem('loggedin');
      }
    });
  }

  onDropChange(event: Tier) {
    this.tierChanged = [...this.tierChanged, event];
    let unSaved = this.submitStatus =  '#f87171';
  }
  onSubmit() {
    if (this.tierChanged.length === 0) return;
    let submittedToServer =this.submitStatus = '#facc15';
    this.tierService
      .updateTiers(this.tierChanged)
      .subscribe(() => this.submitted());
  }

  submitted() {
    let successSubmition = this.submitStatus = '#4ade80';
    setTimeout(() => {
      let backToDefault = this.submitStatus = '#C7C7C7';
    }, 2000);
  }
  unwrap(val: any): any{
    return val ? val : 'undefined'
  }
}
