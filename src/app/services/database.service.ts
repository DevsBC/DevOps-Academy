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
}
