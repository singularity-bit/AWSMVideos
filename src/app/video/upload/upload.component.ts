import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { v4 as uuid } from 'uuid';
import IAlert from 'src/app/models/alert.model';
import { last, switchMap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { ClipService } from 'src/app/services/clip.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnDestroy {
  constructor(
    private storage: AngularFireStorage,
    private auth: AngularFireAuth,
    private clipsService: ClipService,
    private router: Router
  ) {
    auth.user.subscribe(user => this.user = user)
  }


  title = new FormControl('', {
    validators: [
      Validators.required,
      Validators.minLength(3)
    ],
    nonNullable: true
  })
  uploadForm = new FormGroup({
    title: this.title
  })

  inSubmission = false
  showAlert = false
  alertMsg = 'Please wait your video is being uploaded'
  alertColor = 'blue'

  percentage = 0
  showPercentage = false
  isDragover = false
  nextStep = false

  file: File | null = null
  user: firebase.User | null = null

  task?: AngularFireUploadTask

  alertOptions({ alertColor, alertMsg, inSubmission, showAlert }: IAlert) {
    this.inSubmission = inSubmission
    this.showAlert = showAlert
    this.alertMsg = alertMsg
    this.alertColor = alertColor
  }


  ngOnDestroy(): void {
    this.task?.cancel()
  }

  submit() {
    this.uploadForm.disable()

    const clipFileName = uuid()
    const clipPath = `clips/${clipFileName}.mp4`

    this.alertOptions({
      inSubmission: true,
      showAlert: true,
      alertMsg: 'Please wait your video is being uploaded',
      alertColor: 'blue'
    })
    this.showPercentage = true



    this.task = this.storage.upload(clipPath, this.file)
    const clipRef = this.storage.ref(clipPath)

    this.task.percentageChanges().subscribe(progress => {
      this.percentage = progress as number / 100
    })
    this.task.snapshotChanges().pipe(
      last(),
      switchMap(() => clipRef.getDownloadURL())
    ).subscribe({
      next: async (url) => {
        const clip = {
          uid: this.user?.uid as string,
          displayName: this.user?.displayName as string,
          title: this.title.value,
          fileName: `${clipFileName}.mp4`,
          url,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }

        const clipDocRef = await this.clipsService.createClip(clip)

        this.alertOptions({
          inSubmission: true,
          showAlert: true,
          alertMsg: 'Your video was successfully uploaded',
          alertColor: 'green'
        })
        this.showPercentage = false

        setTimeout(() => {
          this.router.navigate([
            'clip', clipDocRef.id
          ])
        }, 1000)
      },
      error: (error) => {
        this.uploadForm.enable()

        this.alertOptions({
          inSubmission: false,
          showAlert: true,
          alertMsg: error.message,
          alertColor: 'red'
        })
        this.showPercentage = false
      }
    })

  }
  storeFile($event: Event) {
    this.isDragover = false

    this.file = ($event as DragEvent).dataTransfer ?
      ($event as DragEvent).dataTransfer?.files.item(0) ?? null :
      ($event.target as HTMLInputElement).files?.item(0) ?? null

    if (!this.file || this.file.type !== 'video/mp4') {
      return
    }

    this.title.setValue(this.file.name.replace(/\.[^/.]+$/, ''))
    this.nextStep = true
  }

}
