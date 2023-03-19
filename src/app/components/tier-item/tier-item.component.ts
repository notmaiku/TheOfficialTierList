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
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { of } from 'rxjs';

@Component({
  selector: 'app-tier-item',
  templateUrl: './tier-item.component.html',
  styleUrls: ['./tier-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TierItemComponent implements OnInit {
  @Input() tier!: Tier;
  @Input() colorList?: Color[];
  @Output() onDeleteTier: EventEmitter<Tier> = new EventEmitter();
  @Input() color!: Color;
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
}
