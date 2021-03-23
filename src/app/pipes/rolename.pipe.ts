import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rolename'
})
export class RolenamePipe implements PipeTransform {

  transform(value: string): string {
    switch (value) {
      case 'master':
        return 'Maestro';
      case 'student': 
        return 'Estudiante';
      case 'unassigned': 
        return 'Sin Asignar';  
      default:
        return 'Sin Asignar';  
    }
  }

}
