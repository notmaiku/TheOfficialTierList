import { Component, OnInit } from '@angular/core';
import { TierService } from 'src/app/services/tier.service';
import { TierColorService } from 'src/app/services/tier-color.service';
import { map } from 'rxjs';
import { Color } from 'src/app/Color';
import { Tier } from 'src/app/Tier';

@Component({
  selector: 'app-tier-list',
  templateUrl: './tier-list.component.html',
  styleUrls: ['./tier-list.component.css'],
})
export class TierListComponent implements OnInit {
  tierList: String[] = ['S', 'A', 'B', 'C', 'D', 'E'];
  tierChanged: Tier[] = [];
  public tierStream$ = this.tierService.getTiers();
  public colorStream$ = this.colorService.getTiers();
  colorData!: Color[];
  tierData!: Tier[];
  constructor(
    private tierService: TierService,
    private colorService: TierColorService
  ) {}
  colorPipe$ = this.colorStream$.pipe();
  tierPipe$ = this.tierStream$.pipe();
  submitStatus: String = '#C7C7C7';
  ngOnInit(): void {
    this.colorData = [{ name: 'primary', start: '#000000', end: '#000000' }];
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
}
