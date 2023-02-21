import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tier-list',
  templateUrl: './tier-list.component.html',
  styleUrls: ['./tier-list.component.css']
})
export class TierListComponent {
  tierList: String[] = ['S','A', 'B', 'C', 'D', 'E'];
}

