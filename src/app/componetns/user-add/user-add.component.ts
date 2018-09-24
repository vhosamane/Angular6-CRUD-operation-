import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../../models/user';
import { UserRegisterService } from '../../services/user-register.service';


@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {

  user: User;
  userDetails: Array<User>;
  userList: any;
  addScreen: boolean = false;
  updateButton: boolean = false;
  registerButton: boolean = true;

  constructor(private _user: UserRegisterService) {
    this.user = new User();
  }

  ngOnInit() {
    this.loadAllUser();
  }

  loadAllUser() {
    this._user.getAllUser()
    .subscribe((result) => {
      console.log(result);
      this.userDetails = result;
    })
  }

  userRegistrationForm(userRegistration: NgForm) {
    if(userRegistration.valid) {
      this._user.registerUser(this.user);
      userRegistration.resetForm();
      this.loadAllUser();
      this.addScreen = false;
    } else {
      alert("Unsuccessful!!!");
    }
  }

  edituser(userId) {
    this.updateButton = true;
    this.registerButton = false;
    this.addScreen = true;
    this._user.editUser(userId)
    .subscribe(res => {
      this.user = res;
    });
  }

  Updateuser(user: any) {
    let key = user.key;
    var updateToUserData = {
      fname : user.fname,
      lname : user.lname,
      email : user.email,
      contact : user.contact
    }
    this._user.updateUser(key, updateToUserData);
    this.loadAllUser();
    this.updateButton = false;
    this.registerButton = true;
    this.addScreen = false;
    user.fname = '';
    user.lname = '';
    user.email = '';
    user.contact = '';
  }

  deleteuser(user: any) {
    this._user.deleteUser(user)
    .subscribe(res => {
      this.user = res;
    });
    this.loadAllUser();
  }

  addUserScreen() {
    this.addScreen = true;
  }

}
