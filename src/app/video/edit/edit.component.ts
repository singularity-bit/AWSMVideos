import { Component, OnInit, OnDestroy, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import IClip from 'src/app/models/clip.model';
import { ModalService } from 'src/app/services/modal.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import IAlert from 'src/app/models/alert.model';
import { ClipService } from 'src/app/services/clip.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, OnDestroy, OnChanges {

  @Input() selectedClip: IClip | null = null
  @Output() update = new EventEmitter()

  constructor(
    private modal: ModalService,
    private clipService: ClipService
  ) { }


  clipID = new FormControl('', {
    nonNullable: true
  })
  title = new FormControl('', {
    validators: [
      Validators.required,
      Validators.minLength(3)
    ],
    nonNullable: true
  })
  editForm = new FormGroup({
    title: this.title,
    id: this.clipID
  })

  inSubmission = false
  showAlert = false
  alertMsg = 'Please wait your video is being updated'
  alertColor = 'blue'

  ngOnInit(): void {
    this.modal.register('editClip')
  }
  ngOnDestroy() {
    this.modal.unregister('editClip')
  }
  ngOnChanges(): void {
    if (!this.selectedClip) {
      return
    }
    this.alertOptions({
      inSubmission: false,
      showAlert: false,
      alertMsg: 'Please wait your video is being updated',
      alertColor: 'blue'
    })
    this.clipID.setValue(this.selectedClip.docID!!)
    this.title.setValue(this.selectedClip.title)
  }

  alertOptions({ alertColor, alertMsg, inSubmission, showAlert }: IAlert) {
    this.inSubmission = inSubmission
    this.showAlert = showAlert
    this.alertMsg = alertMsg
    this.alertColor = alertColor
  }

  async submit() {
    if (!this.selectedClip) {
      return
    }

    this.editForm.disable()
    this.alertOptions({
      inSubmission: true,
      showAlert: true,
      alertMsg: 'Please wait your video is being updated',
      alertColor: 'blue'
    })

    await this.clipService.updateClip(this.clipID.value, this.title.value).then(() => {
      this.alertOptions({
        inSubmission: false,
        showAlert: true,
        alertMsg: 'Your video was successfully updated',
        alertColor: 'green'
      })
      this.selectedClip!!.title = this.title.value
      this.editForm.enable()

      this.update.emit(this.selectedClip)
    }).catch(err => {
      this.alertOptions({
        inSubmission: false,
        showAlert: true,
        alertMsg: err.message,
        alertColor: 'red'
      })
      return
    })



  }

}
