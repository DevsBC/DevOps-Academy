import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'schedulename'
})
export class SchedulenamePipe implements PipeTransform {

  transform(value: string): string {
    switch (value) {
      case 'morning':
        return 'Matutino';
      case 'evening':
        return 'Vespertino';
      case 'intensive':
        return 'Intensivo'
      default:
        return '';      
    }
  }

}
