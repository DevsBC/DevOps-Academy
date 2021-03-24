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
          card: { cols: 1, rows: 1, rowHeight: '500px', width: 'width: 300px;' },
        };
      }

      return {
        columns: 2,
        card: { cols: 1, rows: 2, rowHeight: '250px', width: 'width: 500px;' },
      };
    })
  );

  courses: any;
  copyCourses: any;
  constructor(private breakpointObserver: BreakpointObserver ,private database: DatabaseService) { }

  ngOnInit(): void {
    this.database.getAllCourses().then((response: any) => {
      this.courses = response;
      this.copyCourses = response;
    });
  }

  public search(event: any) {
    const term = event.target.value;
    if (term !== '') {
      const text = term.toLowerCase();
      this.courses = this.courses.filter((c: any) => c.name.toLowerCase().includes(text) 
          || c.category.toLowerCase().includes(text)
          || c.description.toLowerCase().includes(text));
    } else {
      this.courses = [...this.copyCourses];
    }

  }

}
