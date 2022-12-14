import { Component, OnInit, OnDestroy } from '@angular/core';
import { ClipService } from '../services/clip.service';
import { DatePipe } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-clips-list',
  templateUrl: './clips-list.component.html',
  styleUrls: ['./clips-list.component.css'],
  providers: [DatePipe]
})
export class ClipsListComponent implements OnInit {

  constructor(
    public clipService: ClipService,
    public translate: TranslateService,

  ) {
    this.clipService.getClips()
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.clipService.pageClips = []
  }

  loadMore($event: Event) {
    $event.preventDefault()
    this.clipService.getClips()
  }

}
