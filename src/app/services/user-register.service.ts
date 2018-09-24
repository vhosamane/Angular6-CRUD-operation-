import { Injectable } from '@angular/core';
import { AngularFireDatabase } from "angularfire2/database";
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../models/user';
import { Observable  } from 'rxjs/Observable';
import * as firebase from 'firebase';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserRegisterService {

  constructor(private db: AngularFireDatabase, private _http: HttpClient) { }

  registerUser(userDetails) {
    userDetails.userId = '123456789' + userDetails.contact;
    this.db.list('/users').push(userDetails);
  }

  getAllUser() {
    return this._http.get(environment.apiUrl + '/users.json')
    .pipe(map((res: any) => {
      const data = res;
      const user: User[] = [];
      for(let key in data) {
        let userDetails: User = data[key];
        user.push(userDetails);
      }
      return user;
    }));
  }

  editUser(editId) {
    return this._http.get(environment.apiUrl + '/users.json')
    .pipe(map((res: any) => {
      const data = res;
      for(let key in data) {
        let userDetails: User = data[key];
          if(data[key].userId === editId) {
            var Edituser = {
              key: key,
              userId: data[key].fname,
              fname: data[key].fname,
              lname: data[key].lname,
              email: data[key].email,
              contact: data[key].contact
            }
          }
      }
      return Edituser;
    }));
  }

  updateUser(key: string, value: string) {
    this.db.list('/users').update(key, value);
  }

  deleteUser(user) {
    return this._http.get(environment.apiUrl + '/users.json')
    .pipe(map((res: any) => {
      const data = res;
      for(let key in data) {
        let userDetails: User = data[key];
          if(data[key].userId === user.userId) {
            this.deleteSelectedUser(key, user);
          }
      }
      return user;
    }));
  }

  deleteSelectedUser(key, user) {
    return this.db.list('/users/' + key).remove();
  }

}
