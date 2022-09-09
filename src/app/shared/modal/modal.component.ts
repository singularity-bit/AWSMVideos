import { Component, Input, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit, OnDestroy {

  @Input() modalID = ''

  constructor(public modal: ModalService, public element: ElementRef) { }

  closeModal() {
    this.modal.toggleModal(this.modalID)
  }
  ngOnInit(): void {
    document.body.appendChild(this.element.nativeElement)
  }
  ngOnDestroy(): void {
    document.body.removeChild(this.element.nativeElement)
  }


}
