import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import IAlert from 'src/app/models/alert.model';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credentials = {
    email: '',
    password: ''
  }
  inSubmission = false
  showAlert = false
  alertMsg = 'Please wait your accound is being created'
  alertColor = 'blue'
  alertOptions({ alertColor, alertMsg, inSubmission, showAlert }: IAlert) {
    this.inSubmission = inSubmission
    this.showAlert = showAlert
    this.alertMsg = alertMsg
    this.alertColor = alertColor
  }
  constructor(
    private auth: AngularFireAuth
  ) { }

  ngOnInit(): void {
  }
  async login() {
    this.alertOptions({
      inSubmission: true,
      showAlert: true,
      alertMsg: 'Please wait we are logging you in',
      alertColor: 'green'
    })
    try {
      await this.auth.signInWithEmailAndPassword(
        this.credentials.email, this.credentials.password
      )
      this.alertOptions({
        inSubmission: false,
        showAlert: true,
        alertMsg: 'login successfull',
        alertColor: 'green'
      })

    } catch (e: any) {
      this.alertOptions({
        inSubmission: false,
        showAlert: true,
        alertMsg: e.message,
        alertColor: 'red'
      })
    }


  }

}
