import { Component, OnInit } from '@angular/core';
import { TierService } from 'src/app/services/tier.service';
import { TierColorService } from 'src/app/services/tier-color.service';
import { map } from 'rxjs'
import { Color } from 'src/app/Color';
import { Tier } from 'src/app/Tier';

@Component({
  selector: 'app-tier-list',
  templateUrl: './tier-list.component.html',
  styleUrls: ['./tier-list.component.css']
})
export class TierListComponent implements OnInit{
  tierList: String[] = ['S','A', 'B', 'C', 'D', 'E'];
  public tierStream$ = this.tierService.getTiers()
  public colorStream$ = this.colorService.getTiers()
  colorData!: Color[];
  tierData!: Tier[];
  constructor(private tierService: TierService, private colorService: TierColorService) {}
  colorPipe$ = this.colorStream$.pipe()
  tierPipe$ = this.tierStream$.pipe()

  ngOnInit(): void {
  }
}

