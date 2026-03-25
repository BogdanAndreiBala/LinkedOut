import { Directive, HostListener, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Directive({
  selector: '[appInfoIcon]',
  standalone: true,
})
export class InfoIconDirective {
  private snackBar = inject(MatSnackBar);
  @HostListener('mouseenter') onHover(): void {
    this.snackBar.open('X Please fill in all required fields correctly.', 'Dismiss', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['error-snackbar'],
    });
  }
}
