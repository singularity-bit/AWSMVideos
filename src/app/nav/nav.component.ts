import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ModalService } from '../services/modal.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  constructor(
    public modal: ModalService,
    public auth: AuthService,
    private afAuth: AngularFireAuth
  ) { }

  async logout($event: Event) {
    $event.preventDefault()
    await this.afAuth.signOut()
  }
  openModal($event: Event) {
    $event.preventDefault()
    this.modal.toggleModal('auth')
  }


}
