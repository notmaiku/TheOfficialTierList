import { Component, OnInit, Input  } from '@angular/core';
import { TierService } from 'src/app/services/tier.service';
import { Tier } from 'src/app/Tier';

@Component({
  selector: 'app-tiers',
  templateUrl: './tiers.component.html',
  styleUrls: ['./tiers.component.css']
})
export class TiersComponent implements OnInit {
  tier: Tier[] = [];
  @Input() rank!: String;
 constructor(private tierService: TierService) {}

 ngOnInit(): void {
    this.tierService.getTiers().subscribe((tiers) => (this.tier = tiers.filter( t => t.tier === this.rank)));
 }

 deleteTier(tier: Tier){
  this.tierService.deleteTiers(tier).subscribe((tier) => {
    this.tier = this.tier.filter( t => t.id !== tier.id);
  });
 }

 addTier(tier: Tier){
    this.tierService.addTier(tier).subscribe((tier) => (this.tier.push(tier)));
 }

 toggleReminder(tier: Tier){
  tier.reminder = !tier.reminder;
  this.tierService.updateTierReminder(tier).subscribe();
 }

}


