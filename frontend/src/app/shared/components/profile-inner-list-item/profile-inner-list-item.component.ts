import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-profile-inner-list-item',
  imports: [],
  templateUrl: './profile-inner-list-item.component.html',
  styleUrl: './profile-inner-list-item.component.scss',
  standalone: true,
})
export class ProfileInnerListItemComponent {
  @Input({ required: true }) public title: string = '';
  @Input({ required: true }) public subtitle: string = '';
  @Input({ required: true }) public dateRange: string = '';
  @Input() public description?: string;
}
