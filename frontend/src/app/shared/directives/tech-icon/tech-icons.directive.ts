import { Directive, Input, OnInit, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Directive({
  selector: '[appTechIcons]',
  standalone: true,
  host: { '[style.color]': 'iconColor' },
})
export class TechIconsDirective implements OnInit {
  @Input('appTechIcons') headline: string = '';

  private matIcon = inject(MatIcon, { self: true });
  private readonly techIcons = [
    { keyword: 'angular', iconName: 'angular-custom', color: 'rgb(158, 35, 35)' },
    { keyword: 'javascript', iconName: 'js-custom', color: 'rgba(198, 133, 14, 0.97)' },
    { keyword: 'typescript', iconName: 'ts-custom', color: 'rgba(177, 198, 58, 0.84)' },
    { keyword: 'nestjs', iconName: 'nestjs-custom', color: 'rgba(41, 156, 37, 0.85)' },
    { keyword: 'node.js', iconName: 'nodejs-custom', color: 'rgba(32, 190, 225, 0.79)' },
    { keyword: 'rxjs', iconName: 'rxjs-custom', color: 'rgba(29, 71, 178, 0.78)' },
    { keyword: 'html', iconName: 'html-custom', color: 'rgba(15, 12, 103, 0.76)' },
    { keyword: 'css', iconName: 'css-custom', color: 'rgba(104, 12, 130, 0.73)' },
    { keyword: 'sql', iconName: 'sql-custom', color: 'rgba(165, 41, 148, 0.71)' },
    { keyword: 'git', iconName: 'git-custom', color: 'rgba(167, 36, 82, 0.8)' },
  ];

  public iconColor: string = '';

  ngOnInit(): void {
    if (!this.headline) {
      return;
    }

    const lowerHeadline = this.headline.toLowerCase();
    const matchedTech = this.techIcons.find((tech) => lowerHeadline.includes(tech.keyword));

    if (matchedTech) {
      this.matIcon.svgIcon = matchedTech.iconName;
      this.iconColor = matchedTech.color;
    }
  }
}
