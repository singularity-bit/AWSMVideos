import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map, of, tap, pipe, from, filter, BehaviorSubject } from 'rxjs';
import Locale from '../models/locale.model';
import ITranslation from '../models/translation.model';

@Injectable({
  providedIn: 'root'
})
export class TranslationsService {
  public translationsCollection: AngularFirestoreCollection<ITranslation>
  translations: ITranslation[] = []
  pendingRequest = false
  locale = ''

  constructor(
    private db: AngularFirestore
  ) {
    this.translationsCollection = db.collection('translations')
  }

  async initTranslations(locale: string) {
    if (this.pendingRequest || locale === this.locale) {
      return
    }
    this.translations = []
    this.locale = locale
    this.pendingRequest = true

    let query = (this.translationsCollection.doc(locale.toLowerCase()).collection('data') as AngularFirestoreCollection<ITranslation>).ref
    const snapshot = await query.get()

    snapshot.docs.forEach(doc => this.translations.push(doc.data()))

    this.pendingRequest = false

  }

  getTranslation(code: string, param_value?: string) {
    if (!this.translations) {
      return
    }
    let translationItem: ITranslation | null = this.translations.find(item => item.code === code) ?? null
    const replaced = translationItem?.translation.replace(/\[.*\]/, param_value || '')
    translationItem = {
      code: translationItem?.code || '',
      translation: replaced || ''
    }
    return translationItem
  }
}
