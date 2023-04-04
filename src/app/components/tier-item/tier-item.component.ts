import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Tier } from 'src/app/Tier';
import { Color } from 'src/app/Color';

@Component({
  selector: 'app-tier-item',
  templateUrl: './tier-item.component.html',
  styleUrls: ['./tier-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TierItemComponent implements OnInit {
  @Input() tier!: Tier;
  @Input() colorList?: Color[];
  @Input() opacity: String = '1.0';
  @Input() color!: Color;
  @Output() onDeleteTier: EventEmitter<Tier> = new EventEmitter();
  colorStart!: String;
  colorEnd!: String;

  constructor() {}

  ngOnInit(): void {
    this.colorList?.find((t) => t.name === this.tier.title) || undefined;
    // this.colorStart = this.colorList
  }
  onDelete(Tier: Tier) {
    this.onDeleteTier.emit(Tier);
  }
  
  dragged(status: boolean){
    if (status) return this.opacity = '0.5';
    return this.opacity = '1.0';
  }
}
