import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'jobname'
})
export class JobnamePipe implements PipeTransform {

  transform(value: string): string {
    switch (value) {
      case 'employee':
        return 'Empleado';
      case 'developer': 
        return 'Desarrollador';
      case 'engineer': 
        return 'Ingeniero';  
      default:
        return 'Sin definir';  
    }
  }

}
