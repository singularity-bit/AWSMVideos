import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../services/auth.service';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {

  constructor(
    public modal: ModalService,
    public auth: AuthService,
  ) {
  }

  ngOnInit() {
  }


  openModal($event: Event) {
    $event.preventDefault()
    this.modal.toggleModal('auth')
  }


}
