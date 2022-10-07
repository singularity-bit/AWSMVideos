import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import videojs from 'video.js';
import IClip from '../models/clip.model';
import { DatePipe } from '@angular/common';
import { TranslationsService } from '../services/translations.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-clip',
  templateUrl: './clip.component.html',
  styleUrls: ['./clip.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [DatePipe]
})
export class ClipComponent implements OnInit {

  @ViewChild('videoPlayer', { static: true }) target?: ElementRef
  player?: videojs.Player
  clip?: IClip

  param = { displayName: 'username' }

  constructor(
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.player = videojs(this.target?.nativeElement)

    this.route.data.subscribe(data => {
      this.clip = data.clip as IClip
      this.param = { displayName: (data.clip as IClip).displayName }
      this.player?.src({
        src: this.clip.url,
        type: 'video/mp4'
      })
    })
  }

}
