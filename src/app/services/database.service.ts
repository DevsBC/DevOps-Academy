import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { first, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  database: AngularFirestoreDocument;

  constructor(private db: AngularFirestore) {
    this.database = this.db.collection('academy').doc('app');
  }

  public createUser(user: any) {
    return this.database.collection('users').doc(user.id).set(user);
  }

  public saveUser(user: any) {
    return this.database.collection('users').doc(user.id).set(user);
  }

  public async getUser(id: string) {
    const user = await this.database.collection('users').doc(id).valueChanges().pipe(first()).toPromise();
    return user;
  }

  public getEmployees() {
    return this.database.collection('users')
    .snapshotChanges()
    .pipe(map((docs) => docs.map((a) => a.payload.doc.data())));
  }

  public createSchedule(schedule: any) {
    schedule.id = this.db.createId();
    return this.database.collection('schedules').doc(schedule.id).set(schedule);
  }

  public getSchedules() {
    return this.database.collection('schedules')
    .snapshotChanges()
    .pipe(map((docs) => docs.map((a) => a.payload.doc.data())));
  }

  public updateScheduleStatus(schedule: any) {
    return this.database.collection('schedules').doc(schedule.id).update({ status: schedule.status });
  }

  public deleteSchedule(schedule: any) {
    return this.database.collection('schedules').doc(schedule.id).delete();
  }

  public createResource(resource: any) {
    resource.id = this.db.createId();
    return this.database.collection('resources').doc(resource.id).set(resource);
  }

  public getResources() {
    return this.database.collection('resources')
    .snapshotChanges()
    .pipe(map((docs) => docs.map((a) => a.payload.doc.data())));
  }

  public getMasters() {
    const masters: any = [];
    return this.database.collection('users').valueChanges()
      .pipe(map((users: any) => {
        users.forEach((user: any) => {
          if (user.role) { if (user.role === 'master') { masters.push(user); }
        }
      });
      return masters;
    })).pipe(first()).toPromise();
  }

  public getStudents() {
    const masters: any = [];
    return this.database.collection('users').valueChanges()
      .pipe(map((users: any) => {
        users.forEach((user: any) => {
          if (user.role) { if (user.role === 'student') { masters.push(user); }
        }
      });
      return masters;
    })).pipe(first()).toPromise();
  }

  public getActiveSchedules() {
    const activeSchedules: any = [];
    return this.database.collection('schedules').valueChanges()
      .pipe(map((schedules: any) => {
          schedules.map((schedule: any) => { 
            if (schedule.status === 'ACTIVE') { activeSchedules.push(schedule); }
          });
        return activeSchedules;
        }
      ))
      .pipe(first()).toPromise();
  }

  public getAllCourses() {
    return this.database.collection('courses').valueChanges()
    .pipe(map((courses: any) => {
        return courses.map((course: any) => { 
          return course;
        });
      }
    ))
    .pipe(first()).toPromise();
  
  }

  public getAllResources() {
    return this.database.collection('resources').valueChanges().pipe(first()).toPromise();
  }

  public setCourse(course: any) {
    return this.database.collection('courses').doc(course.code).set(course);
  }

  public async updateUnitsAvailable(resources: any) {
    const batch = this.db.firestore.batch();

    for (const resource of resources) {
      const ref = this.database.collection('resources').doc(resource.id).ref;
      batch.update(ref, { unitsAvailable: resource.unitsAvailable });
    }
    return await batch.commit();
  }

}
