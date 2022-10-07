import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import ITranslation from './models/translation.model';
import ITranslationOBject from './models/translationObject.model';
import { AuthService } from './services/auth.service';
import { TranslationsService } from './services/translations.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AWSMVideos';
  locale = ''
  constructor(
    public auth: AuthService,
    public translate: TranslateService,
    private translationsService: TranslationsService
  ) {
    this.locale = localStorage.getItem('lang') || 'en'
    translate.use(this.locale);
    translate.setTranslation(this.locale, this.translationsService.getTranslation(this.locale))
  }
}
