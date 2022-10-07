import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import IAlert from 'src/app/models/alert.model';
import { TranslateService } from '@ngx-translate/core';
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

  alert_creating_account = ''
  login_successfull = ''
  alertOptions({ alertColor, alertMsg, inSubmission, showAlert }: IAlert) {
    this.inSubmission = inSubmission
    this.showAlert = showAlert
    this.alertMsg = alertMsg
    this.alertColor = alertColor
  }
  constructor(
    private auth: AngularFireAuth,
    private translate: TranslateService,

  ) { }

  ngOnInit(): void {
    this.translate.get('alert_creating_account').subscribe(value => this.alert_creating_account = value)
    this.translate.get('login_successfull').subscribe(value => this.login_successfull = value)
  }
  async login() {
    this.alertOptions({
      inSubmission: true,
      showAlert: true,
      alertMsg: this.alert_creating_account,
      alertColor: 'green'
    })
    try {
      await this.auth.signInWithEmailAndPassword(
        this.credentials.email, this.credentials.password
      )
      this.alertOptions({
        inSubmission: false,
        showAlert: true,
        alertMsg: this.login_successfull,
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
