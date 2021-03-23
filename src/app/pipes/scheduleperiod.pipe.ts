import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'scheduleperiod'
})
export class ScheduleperiodPipe implements PipeTransform {

  transform(value: string): string {
    switch (value) {
      case 'monday-friday':
        return 'Lunes a Viernes';
      case 'friday-sunday':
        return 'Fin de Semana';
      case 'saturday':
        return 'Sabados';
      default: 
      return '';    
    }
  }

}
