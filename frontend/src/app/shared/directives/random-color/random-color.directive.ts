import { Directive, OnInit } from '@angular/core';

@Directive({
  selector: '[appRandomColor]',
  standalone: true,
  host: {
    '[style.backgroundColor]': 'bgColor',
  },
})
export class RandomColorDirective implements OnInit {
  public bgColor: string = '';

  private readonly colors = [
    '#FFE4E1',
    '#FFDAB9',
    '#E6E6FA',
    '#D8BFD8',
    '#B0E0E6',
    '#F0F8FF',
    '#F5FFFA',
    '#FFB3BA',
    '#FFDFBA',
    '#FFFFBA',
    '#BAFFC9',
    '#BAE1FF',
    '#D5AAFF',
    '#FFC8A2',
    '#E2F0CB',
    '#B5EAD7',
    '#C7CEEA',
    '#FBE7C6',
    '#FFAEBC',
    '#A0E7E5',
    '#B4F8C8',
    '#E6A8D7',
    '#C3B1E1',
    '#9CD0F5',
    '#FDFD96',
    '#FF9AA2',
    '#E2C6FF',
  ];

  ngOnInit(): void {
    const randomIndex = Math.floor(Math.random() * this.colors.length);
    this.bgColor = this.colors[randomIndex];
  }
}
