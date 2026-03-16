import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-profile-main-list-item',
  imports: [MatCardModule],
  templateUrl: './profile-main-list-item.component.html',
  styleUrl: './profile-main-list-item.component.scss',
  standalone: true,
})
export class ProfileMainListItemComponent {
  @Input() public title: string = '';
}
