import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { TranslationsService } from 'src/app/services/translations.service';

@Component({
  selector: 'app-auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.css']
})
export class AuthModalComponent implements OnInit, OnDestroy {

  constructor(public modal: ModalService, public translations: TranslationsService) { }

  ngOnInit(): void {
    this.modal.register('auth')
  }
  ngOnDestroy(): void {
    this.modal.unregister('auth')
  }

}
