import { AfterViewInit, Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditEmployeeComponent } from '../../modals/dialog-edit-employee/dialog-edit-employee.component';

@Component({
  selector: 'app-employees-table',
  templateUrl: './employees-table.component.html',
  styleUrls: ['./employees-table.component.css']
})
export class EmployeesTableComponent implements AfterViewInit, OnInit {

  @ViewChild(MatPaginator) paginator = {} as MatPaginator;
  @ViewChild(MatSort) sort = {} as MatSort;
  @ViewChild(MatTable) table = {} as MatTable<any>;

  dataSource!: MatTableDataSource<any>;
  dataLength: number = 0;
  @Input() data: any;

  displayedColumns = [
    'employeeCode',
    'firstName',
    'lastName',
    'email',
    'telephone',
    'job',
    'role',
    'actions'
  ];

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (this.data) {
      setTimeout(() => {
        this.dataSource = new MatTableDataSource(this.data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;
        this.dataLength = this.data.length;
      })
     
    }
  }

  public applyFilter(event: any): void {
    let filterValue = event.target.value;
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    if (this.dataSource) { this.dataSource.filter = filterValue; }
  }

  public editEmployee(employee: any) {
    this.dialog.open(DialogEditEmployeeComponent, {
      data: {
        employee
      }
    });
  } 

}
