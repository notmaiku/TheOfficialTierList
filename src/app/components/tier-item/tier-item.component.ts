import { Component, Input, Output, EventEmitter, OnInit, ChangeDetectionStrategy} from '@angular/core';
import { Tier } from 'src/app/Tier';
import { Color } from 'src/app/Color';
import { faTimes} from '@fortawesome/free-solid-svg-icons'
import { of, map } from 'rxjs';


@Component({
  selector: 'app-tier-item',
  templateUrl: './tier-item.component.html',
  styleUrls: ['./tier-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TierItemComponent implements OnInit{
  @Input() tier!: Tier;
  @Input() colorList?: Color[];
  @Output() onDeleteTier: EventEmitter<Tier> = new EventEmitter;
  faTimes = faTimes;
  @Input() color!: String;
  colorGradient?: String;
  list = of(this.colorList);     

constructor() {
}

ngOnInit(): void {
  // this.color = `from-${this.color}-500`
}
  onDelete(Tier: Tier){
    this.onDeleteTier.emit(Tier);
  }

    gradient2(){
      console.log('c','from-'+this.color+'-500')
      return 'from-'+this.color+'-500'
      // return 'from-green-500'
    }
}





