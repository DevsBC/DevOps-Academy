import { Component, OnInit } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { DatabaseService } from '../../services/database.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  course: any = {}
  showResources = false;
  loading = true;
  sending = false;
  masters: any;
  schedules: any;
  courses: any;
  resources: any;
  copyCourses: any;
  newResources: any = [];

  constructor(private database: DatabaseService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    const promises = [this.database.getMasters(), 
                          this.database.getActiveSchedules(),
                          this.database.getAllCourses(),
                          this.database.getAllResources()];
    forkJoin(promises).subscribe( ([masters, schedules, courses, resources]) => {
      this.masters = masters;
      this.schedules = schedules;
      console.log(courses);
      this.courses = courses;
      this.copyCourses = [...this.courses];
      this.resources = resources
      this.loading = false;
    }, error => console.log(error));
  }

  public async onSubmit() {
    this.course.code = 'CO' + Math.floor(100000 + Math.random() * 900000).toString();
    const requiredCourses = this.courses.filter((c: any) => c.selected);
    if (requiredCourses.length > 0) { this.course.requiredCourses = requiredCourses; }
    console.log(this.course);
    
    try {
      this.sending = true;
      await this.database.setCourse(this.course);
      if (this.newResources.length > 0) {
        await this.database.updateUnitsAvailable(this.newResources);
        this.resources = await this.database.getAllResources();
      }
      this.courses = await this.database.getAllCourses();
      this.copyCourses = [...this.courses];
      this.openSnackBar('El curso se ha creado');
      this.course = {};
      this.sending = false;
    } catch (error) {
      this.sending = false;
      this.openSnackBar('Hubo un error');
    }
  }

  public selectCourse(course: any) {
    if (course.selected) {
      course.selected = false;
    } else {
      course.selected = true;
    }
  }

  public filterByKey(event: any) {
    let filterValue = event.target.value;
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    if (filterValue !== '') {
      this.courses = this.courses.filter((c: any) => c.name.toLowerCase().includes(filterValue));
    } else {
      this.courses = [...this.copyCourses];
    }
  }


  public onChange(event: any) {
    if (event.checked) {
      this.showResources = true;
    } else {
      this.showResources = false;
    }
  }

  public addResource(event: any, resource: any) {
    const value = event.value;
    const newResource = { ...resource };
    newResource.unitsAvailable = newResource.totalUnits - value;
    const resourceFound = this.newResources.find((r: any) => r.name === newResource.name);
    if (resourceFound) {
      resourceFound.unitsAvailable = resourceFound.totalUnits - value;
    } else {
      this.newResources.push(newResource);
    }

    const resourceToRecord = {
      ...newResource,
      inUse: value
    };

    if (this.course.resources) {
      const resFound = this.course.resources.find((res: any) => res.name === resourceToRecord.name);
      if (resFound) {
        resFound.inUse = value;
      } else {
        this.course.resources.push(resourceToRecord);
      }
    } else {
      this.course.resources = [];
      this.course.resources.push(resourceToRecord);
    }
  }


  private openSnackBar(message: string): void {
    this.snackBar.open(message, 'OK', {
      duration: 2000,
    });
  }

}
