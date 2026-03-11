import { provideAppInitializer, inject } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import {
  angularIcon,
  cssIcon,
  gitIcon,
  htmlIcon,
  javascriptIcon,
  nestjsIcon,
  nodejsIcon,
  rxjsIcon,
  sqlIcon,
  typescriptIcon,
} from '../assets/icons';

const icons = [
  { name: 'angular-custom', svg: angularIcon },
  { name: 'js-custom', svg: javascriptIcon },
  { name: 'ts-custom', svg: typescriptIcon },
  { name: 'nestjs-custom', svg: nestjsIcon },
  { name: 'nodejs-custom', svg: nodejsIcon },
  { name: 'rxjs-custom', svg: rxjsIcon },
  { name: 'html-custom', svg: htmlIcon },
  { name: 'css-custom', svg: cssIcon },
  { name: 'sql-custom', svg: sqlIcon },
  { name: 'git-custom', svg: gitIcon },
];

export function provideCustomIcons() {
  return provideAppInitializer(() => {
    const iconRegistry = inject(MatIconRegistry);
    const sanitizer = inject(DomSanitizer);
    icons.forEach((icon) => {
      iconRegistry.addSvgIconLiteral(icon.name, sanitizer.bypassSecurityTrustHtml(icon.svg));
    });
  });
}
