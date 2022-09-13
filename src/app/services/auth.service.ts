import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

import { Observable, of } from 'rxjs';
import { delay, map, filter, switchMap } from 'rxjs/operators'
import IUser from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userCollection: AngularFirestoreCollection<IUser>
  public isAuthenticated$: Observable<boolean>
  public isAuthDelay$: Observable<boolean>
  #redirect = false
  constructor(
    private auth: AngularFireAuth,
    private db: AngularFirestore,
    private afAuth: AngularFireAuth,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.userCollection = db.collection('users')
    this.auth.user.subscribe(console.log)
    this.isAuthenticated$ = auth.user.pipe(
      map(user => !!user)
    )
    this.isAuthDelay$ = this.isAuthenticated$.pipe(
      delay(1000)
    )
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      map(e => this.route.firstChild),
      switchMap(route => route?.data ?? of({}))
    ).subscribe(data => {
      this.#redirect = data.authOnly ?? false
    })
  }

  public async createUser(userData: IUser) {

    if (!userData.password) {
      throw new Error('Provide password')
    }
    const userCred = await this.auth.createUserWithEmailAndPassword(
      userData.email, userData.password
    )
    if (!userCred.user) {
      throw new Error("user can't be found")
    }

    await this.userCollection.doc(userCred.user?.uid).set({
      name: userData.name,
      email: userData.email,
      age: userData.age,
      phoneNumber: userData.phoneNumber
    })
    await userCred.user.updateProfile({
      displayName: userData.name
    })
  }
  public async logout($event?: Event) {
    $event?.preventDefault()
    await this.afAuth.signOut()

    this.#redirect && await this.router.navigateByUrl('/')
  }
}
