import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priority'
})
export class PriorityPipe implements PipeTransform {

  transform(value: number | undefined, ...args: unknown[]): string {
    switch(value!.toString()) {
      case '1':
        return 'Lowest';
      case '2':
        return 'Low';
      case '3':
        return 'Medium';
      case '4':
        return 'High';
    }
    return '';
  }
}
