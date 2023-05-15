import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
} from '@angular/core';
import { TierService } from 'src/app/services/tier.service';
import { Tier } from 'src/app/Tier';
import { Color } from 'src/app/Color';
import { TierColorService } from 'src/app/services/tier-color.service';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tiers',
  templateUrl: './tiers.component.html',
  styleUrls: ['./tiers.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TiersComponent implements OnInit  {
  @Output() onDropChange = new EventEmitter<Tier>();
  @Input() rank!: String;
  @Input() i!: number;
  @Input() tierData!: Tier[];
  @Input() colorData!: Color[];
  deleteSub!: Subscription;
  opacity: String = '1.0';
  tier: Tier[] = [];
  color!: Color;
  colors: string[] = [
    '#e57373',
    '#ffb74d',
    '#fff176',
    '#aed581',
    '#81c784',
    '#887EC6',
  ];
  constructor(
    private tierService: TierService,
    private colorService: TierColorService
  ) {}

  ngOnInit(): void {
    this.tier = this.tierData.filter((item) => item.tier === this.rank);
  }

  getItemGradient(item: any): Color {
    let found = this.colorData.find((c) => c.name === item);
    if (found) return found;
    return {
      name: 'default',
      start: 'transparent',
      end: 'transparent',
    } as Color;
  }
  addTier(tier: Tier) {
    this.tierService.addTier(tier).subscribe((tier) => this.tier.push(tier));
  }
  drop(event: CdkDragDrop<Tier[]>) {
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
    this.reRank(
      event.container.data,
      event.previousContainer.data,
      event.currentIndex,
      event.container.element.nativeElement.id
    );
  }
  reRank(newContainer: Tier[], oldContainer: Tier[], newId: number, newContainerRank: string) {
    let dropIndex = newContainer.findIndex((t,index) => index === newId)
    let refToOldVal = newContainer[dropIndex]
    let updatedTier = {...refToOldVal,tier: newContainerRank}
    newContainer.splice(dropIndex,1)
    newContainer.push(updatedTier)
    this.recordChangedColumnIndexes([
      oldContainer,
      newContainer
    ]);
  }
  emitDrop(droppedATier: Tier) {
    this.onDropChange.emit(droppedATier);
  }

  recordChangedColumnIndexes(containers: Tier[][]) {
    containers.forEach((container) => {
      container.forEach((tier, index) => {
        tier = {...tier,hori: index}
        this.emitDrop(tier);
      });
    });
  }

}
