import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import IAlert from 'src/app/models/alert.model';
import IUser from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})


export class RegisterComponent {

  constructor(private auth: AuthService) { }


  name = new FormControl('', [
    Validators.required,
    Validators.minLength(3)
  ])
  email = new FormControl('', [
    Validators.email,
    Validators.required
  ])
  age = new FormControl<number | null>(null, [
    Validators.required,
    Validators.min(16),
    Validators.max(99)
  ])
  password = new FormControl('', [
    Validators.required,
    Validators.pattern(/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/)
  ])
  confirm_password = new FormControl('', [
    Validators.required,

  ])
  phoneNumber = new FormControl('', [
    Validators.required,
    Validators.minLength(13),
    Validators.maxLength(13)
  ])

  inSubmission = false
  showAlert = false
  alertMsg = 'Please wait your accound is being created'
  alertColor = 'blue'

  registerForm = new FormGroup({
    name: this.name,
    email: this.email,
    age: this.age,
    password: this.password,
    confirm_password: this.confirm_password,
    phoneNumber: this.phoneNumber
  })

  alertOptions({ alertColor, alertMsg, inSubmission, showAlert }: IAlert) {
    this.inSubmission = inSubmission
    this.showAlert = showAlert
    this.alertMsg = alertMsg
    this.alertColor = alertColor
  }

  async register() {
    this.alertOptions({
      inSubmission: true,
      showAlert: true,
      alertMsg: 'Please wait your accound is being created',
      alertColor: 'green'
    })

    try {
      this.auth.createUser(this.registerForm.value as IUser)
      this.alertOptions({
        inSubmission: false,
        showAlert: true,
        alertMsg: 'Your account was successfully created',
        alertColor: 'green'
      })

    } catch (err: any) {
      this.alertOptions({
        inSubmission: false,
        showAlert: true,
        alertMsg: err.message,
        alertColor: 'red'
      })
      return
    }

  }

}
