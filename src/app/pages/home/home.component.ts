import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return {
          columns: 1,
          card: { cols: 1, rows: 1, rowHeight: "300px" },
        };
      }

      return {
        columns: 4,
        card: { cols: 1, rows: 2, rowHeight: "200px" },
      };
    })
  );

  courses: any;
  constructor(private breakpointObserver: BreakpointObserver ,private database: DatabaseService) { }

  ngOnInit(): void {
    this.database.getAllCourses().then((response: any) => this.courses = response);
  }

}
