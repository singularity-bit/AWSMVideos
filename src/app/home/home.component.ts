import { Component, OnInit } from '@angular/core';
import { TranslationsService } from '../services/translations.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    public translations: TranslationsService
  ) { }

  ngOnInit(): void {
  }

}
