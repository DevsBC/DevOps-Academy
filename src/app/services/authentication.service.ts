import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  
  sessionName = 'session-devops';

  constructor(private afAuth: AngularFireAuth, private database: DatabaseService) { }

  public async signIn(user: any) {
    try {
      const userInfo = await this.afAuth.signInWithEmailAndPassword(user.email, user.password);
      const uid = (userInfo.user) ? userInfo.user.uid : '';
      await this.saveSession({}, uid, false);
    } catch (error) {
      throw error;
    }
  }

  public async signUp(user: any) {
    try {
      const userInfo = await this.afAuth.createUserWithEmailAndPassword(user.email, user.password);
      const uid = (userInfo.user) ? userInfo.user.uid : '';
      await this.saveSession(user, uid, true);
    } catch (error) {
      throw error;
    }
  }

  public async saveSession(user: any, uid: string, isNew: boolean) {
    try {
      let session: any;
      if (isNew) {
        user.id = uid;
        user.job = 'employee';
        user.employeeCode = Math.floor(100000 + Math.random() * 900000).toString();
        delete user.password;
        await this.database.createUser(user);
        session = {
          ...user
        };
      } else {
        user = await this.database.getUser(uid);
        session = {
          ...user
        };
      }
      sessionStorage.setItem(this.sessionName, JSON.stringify(session));
    } catch (error) {
      throw error;
    }
  }

  public isAuthenticated() {
    if (sessionStorage.getItem(this.sessionName)) {
      return true;
    } else {
      return false;
    }
  }

  public getSession() {
    return {
      id:'uid',
      job: 'employee',
      employeeCode: Math.floor(100000 + Math.random() * 900000).toString(),
      firstName: 'Juan Carlos',
      lastName: 'Aranda Alonso',
      email: 'juancarlos.aral@gmail.com',
      telephone: '6567500055'

    }
  }

  public destroySession() {
    sessionStorage.removeItem(this.sessionName);
  }

}
