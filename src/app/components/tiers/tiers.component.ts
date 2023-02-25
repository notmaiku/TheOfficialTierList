import { Component, OnInit, Input, OnDestroy, ChangeDetectionStrategy  } from '@angular/core';
import { TierService } from 'src/app/services/tier.service';
import { Tier } from 'src/app/Tier';
import { Color } from 'src/app/Color';
import { map, switchMap } from 'rxjs'
import { TierColorService } from 'src/app/services/tier-color.service';

@Component({
  selector: 'app-tiers',
  templateUrl: './tiers.component.html',
  styleUrls: ['./tiers.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TiersComponent implements OnInit {
// export class TiersComponent {
  @Input() rank!: String;
  @Input() i!: number;
  @Input() tierData!: Tier[];
  @Input() colorData!: Color[];
  tier: Tier[] = [];
  color!: Color;
  colors: string[] = ['#e57373', '#ffb74d', '#fff176', '#aed581', '#81c784', '#483d8b']
 constructor(private tierService: TierService, private colorService: TierColorService) { }

 ngOnInit(): void {
  this.tier = this.tierData.filter((item)=>item.tier === this.rank)

 }
 getItemGradient(item: any): String{
   let found = this.colorData.find((c)=> c.name === item)  
   console.log('found',found, item)
   if(found) return found.color
   return 'black'
 }
 deleteTier(tier: Tier){
  this.tierService.deleteTiers(tier).subscribe((tier) => {
    this.tier = this.tier.filter( t => t.id !== tier.id);
  });
 }

 addTier(tier: Tier){
    this.tierService.addTier(tier).subscribe((tier) => (this.tier.push(tier)));
 }


}


