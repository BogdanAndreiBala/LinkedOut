import { Directive, ElementRef, inject, Input } from '@angular/core';

@Directive({
  selector: '[appHighlightTableRow]',
  host: {
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()',
  },
  standalone: true,
})
export class HighlightTableRowDirective {
  @Input('appHighlightTableRow') headline: string = '';
  private hostElement = inject(ElementRef);
  private favoritecolor = 'rgba(15, 73, 45, 0.26)';

  public containsWord(word: string): boolean {
    if (!this.headline) {
      return false;
    }
    if (this.headline.toLowerCase().includes(word.toLowerCase())) {
      return true;
    }
    return false;
  }

  private highlight(color: string): void {
    this.hostElement.nativeElement.style.backgroundColor = color;
  }

  public onMouseEnter(): void {
    if (this.containsWord('angular')) {
      this.highlight(this.favoritecolor);
    }
  }

  public onMouseLeave(): void {
    this.highlight('');
  }
}
