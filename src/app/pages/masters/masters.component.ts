import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-masters',
  templateUrl: './masters.component.html',
  styleUrls: ['./masters.component.css']
})
export class MastersComponent implements OnInit {

  @ViewChild('masterRef') masterRef: ElementRef | undefined;
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return {
          columns: 1,
          card: { cols: 1, rows: 1, rowHeight: '400px' },
          miniCard: { cols: 1, rows: 1, rowHeight: '400px' },
          experience: { cols: 1, rows: 1, rowHeight: '400px' },
          courses: { cols: 1, rows: 1, rowHeight: '400px' },
        };
      }

      return {
        columns: 4,
        card: { cols: 3, rows: 2, rowHeight: '200px' },
        miniCard: { cols: 1, rows: 2, rowHeight: '200px' },
        experience: { cols: 2, rows: 2, rowHeight: '200px' },
        courses: { cols: 2, rows: 2, rowHeight: '200px' },
      };
    })
  );

  ready = false;
  masters: any;
  courses: any;
  masterCourses: any;
  array: any;
  masterSelected: any;
  stars: number = 1;

  constructor(private breakpointObserver: BreakpointObserver, private database: DatabaseService) { }

  ngOnInit(): void {
    this.database.getMasters().then((response: any) => { 
      this.masters = response;
      this.array = this.generateRandomArray();
      this.stars = this.getStars();
      console.log(this.array);
      this.ready = true;
    });

    this.database.getAllCourses().then((courses: any) => {
      this.courses = courses;
    })
  }

  private generateRandomArray() {
    const length = Math.floor(Math.random() * 15) + 1;
    const followers: any = [];
    for (let i = 0; i < length; i++) {
      const follower = {
        name: this.makeLetter(),
        color: '#' + (0x1000000 + Math.random()*0xffffff).toString(16).substr(1,6)
      }
      followers.push(follower);
    }
  return followers;
  }

  private makeLetter() {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const text = possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  }

  public selectEmployee(employee: any) {
    this.masterRef?.nativeElement.scrollIntoView({ behavior: 'smooth'});
    this.stars = this.getStars();
    this.masterSelected = employee;
    this.masterCourses = this.courses.filter((c: any) => c.master.id === employee.id);
    console.log(this.masterCourses);
  }

  public getStars() {
    return Math.floor(Math.random() * 5) + 1;
  }

}
