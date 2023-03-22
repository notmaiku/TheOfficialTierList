import { Component, OnInit, Input, OnDestroy, ChangeDetectionStrategy  } from '@angular/core';
import { TierService } from 'src/app/services/tier.service';
import { Tier } from 'src/app/Tier';
import { Color } from 'src/app/Color';
import { map, switchMap } from 'rxjs'
import { TierColorService } from 'src/app/services/tier-color.service';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { container } from 'webpack';

@Component({
  selector: 'app-tiers',
  templateUrl: './tiers.component.html',
  styleUrls: ['./tiers.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TiersComponent implements OnInit {
  @Input() rank!: String;
  @Input() i!: number;
  @Input() tierData!: Tier[];
  @Input() colorData!: Color[];
  tier: Tier[] = [];
  color!: Color;
  colors: string[] = ['#e57373', '#ffb74d', '#fff176', '#aed581', '#81c784', '#887EC6']
 constructor(private tierService: TierService, private colorService: TierColorService) { }

 ngOnInit(): void {
  this.tier = this.tierData.filter((item)=>item.tier === this.rank)

 }
 getItemGradient(item: any): Color{
   let found = this.colorData.find((c)=> c.name === item)  
   if(found) return found
   return {name: 'default', start: 'transparent', end: 'transparent'} as Color
 }
 deleteTier(tier: Tier){
  this.tierService.deleteTiers(tier).subscribe((tier) => {
    this.tier = this.tier.filter( t => t.id !== tier.id);
  });
 }

 addTier(tier: Tier){
    this.tierService.addTier(tier).subscribe((tier) => (this.tier.push(tier)));
 }

 drop(event: CdkDragDrop<Tier[]>){
//  drop(event: CdkDragDrop<Tier[]>, item: Tier){
  transferArrayItem(
    event.previousContainer.data,
    event.container.data,
    event.previousIndex,
    event.currentIndex
  );
  this.reRank(event.container.data, event.item.element.nativeElement.id);
}

reRank(newContainer: Tier[],  title: String){
  let newTier = newContainer[0].tier;
  let itemIndex = newContainer.findIndex(item => item.title.trim() == title.trim());
  newContainer[itemIndex].tier = newTier;
}


}
