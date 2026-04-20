import { Component, Input } from '@angular/core';
import { NgStyle } from '@angular/common';

export const small: number = 10;
export const medium: number = 14;
export const large: number = 18;

@Component({
  selector: 'app-avatar',
  imports: [NgStyle],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss',
})
export class AvatarComponent {
  @Input() public firstName: string = '';
  @Input() public lastName: string = '';
  @Input() public sizeStyles: 'small' | 'medium' | 'large' | string = 'medium';
  private backgroundColors: string = '#0a66c2';

  get initials(): string {
    const firstInitial = this.firstName.charAt(0).toUpperCase();
    const lastInitial = this.lastName.charAt(0).toUpperCase();
    return `${firstInitial}${lastInitial}`;
  }

  get backgroundColor(): string {
    return this.backgroundColors;
  }

  get sizeStylesDimensions(): { fontSize: string } {
    switch (this.sizeStyles) {
      case 'small':
        return { fontSize: `${small}px` };
      case 'large':
        return { fontSize: `${large}px` };
      default:
        return { fontSize: `${medium}px` };
    }
  }
}
