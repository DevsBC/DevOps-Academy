import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  employees: any;
  ready = false;
  constructor(private database: DatabaseService) { }

  ngOnInit(): void {
    const subscribe = this.database.getEmployees().subscribe((response: any) => {
      this.employees = response;
      console.log(response);
      subscribe.unsubscribe();
      this.ready = true;
    })
  }

}
