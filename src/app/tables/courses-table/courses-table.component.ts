import { AfterViewInit, Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-courses-table',
  templateUrl: './courses-table.component.html',
  styleUrls: ['./courses-table.component.css']
})
export class CoursesTableComponent implements AfterViewInit, OnInit {

  @ViewChild(MatPaginator) paginator = {} as MatPaginator;
  @ViewChild(MatSort) sort = {} as MatSort;
  @ViewChild(MatTable) table = {} as MatTable<any>;

  dataSource!: MatTableDataSource<any>;
  dataLength: number = 0;
  @Input() data: any;

  displayedColumns = [
    'code',
    'name',
    'category',
    'duration',
    'studentCapacity',
    'master.firstName',
    'schedule.name'
  ];
  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    console.log(this.data);
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

}
