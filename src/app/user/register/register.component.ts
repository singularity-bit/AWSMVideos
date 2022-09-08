import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { min } from 'rxjs';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})


export class RegisterComponent {

  name = new FormControl('', [
    Validators.required,
    Validators.minLength(3)
  ])
  email = new FormControl('', [
    Validators.email,
    Validators.required
  ])
  age = new FormControl('', [
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

  register() {
    this.showAlert = true
    this.alertMsg = 'Please wait your accound is being created'
    this.alertColor = 'green'
  }

}
