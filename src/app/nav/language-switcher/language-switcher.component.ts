import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { TranslationsService } from 'src/app/services/translations.service';

@Component({
  selector: 'app-language-switcher',
  templateUrl: './language-switcher.component.html',
  styleUrls: ['./language-switcher.component.css']
})
export class LanguageSwitcherComponent implements OnInit {
  openLanguageSelector = false
  lang
  constructor(
    private translations: TranslationsService
  ) {
    this.lang = localStorage.getItem('lang') || 'en'
  }

  ngOnInit(): void {
  }

  changeLocale($event: Event) {
    $event.preventDefault()
    localStorage.setItem('lang', ($event.target as HTMLSelectElement).value)
    window.location.reload()
  }
}
