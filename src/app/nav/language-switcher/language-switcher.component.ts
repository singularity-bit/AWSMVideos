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

  constructor(
    private translations: TranslationsService
  ) {
  }

  ngOnInit(): void {
    this.translations.initTranslations('EN')
  }

  changeLocale($event: Event) {
    $event.preventDefault()
    this.translations.initTranslations(($event.target as HTMLSelectElement).value)
  }
}
