import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'endDate',
  standalone: true,
})
export class EndDatePipe implements PipeTransform {
  transform(value: string | number | null): number | string {
    if (!value) {
      return 'Present';
    }
    return value;
  }
}
