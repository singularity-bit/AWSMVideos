import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { TranslateLoader } from '@ngx-translate/core';
import { map, of, tap, pipe, from, filter, BehaviorSubject, Observable } from 'rxjs';
import Locale from '../models/locale.model';
import ITranslation from '../models/translation.model';
import ITranslationOBject from '../models/translationObject.model';

@Injectable({
  providedIn: 'root'
})
export class TranslationsService implements TranslateLoader {
  public translationsCollection: AngularFirestoreCollection<ITranslation>

  constructor(
    private db: AngularFirestore
  ) {
    this.translationsCollection = db.collection('translations')
  }
  getTranslation(lang: string): Observable<ITranslationOBject> {
    return (this.translationsCollection.doc(lang.toLowerCase()).collection('data') as AngularFirestoreCollection<ITranslation>)
      .valueChanges()
      .pipe(map(trans => {
        const res: ITranslationOBject = {}
        trans.forEach(obj => {
          res[obj.code] = obj.translation.replace('[', '{{').replace(']', '}}')
        })
        return res
      }))
  }
}
