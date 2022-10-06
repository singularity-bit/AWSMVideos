import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ModalService } from '../services/modal.service';
import { TranslationsService } from '../services/translations.service';
import { LanguageSwitcherComponent } from './language-switcher/language-switcher.component';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {

  constructor(
    public modal: ModalService,
    public auth: AuthService,
    public translations: TranslationsService,
  ) {


  }

  ngOnInit() {

  }


  openModal($event: Event) {
    $event.preventDefault()
    this.modal.toggleModal('auth')
  }


}
