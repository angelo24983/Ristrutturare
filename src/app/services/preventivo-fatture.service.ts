import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AuthService } from '../services/auth.service';
import { PreventivoFatturaDB } from '../shared/preventivoFattura';
import { Observable, of } from 'rxjs';
import { delay, catchError, map } from 'rxjs/operators';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class PreventivoFattureService {

  private isUserLogged: boolean = false;

  constructor(private afs: AngularFirestore,
    private authService: AuthService ) {
    this.isUserLogged = this.authService.isLoggedIn();
  }

  getPreventivoFatturaDB(preventivoId: string, fatturaId: string): Observable<PreventivoFatturaDB[]> {
    return this.afs.
    collection<PreventivoFatturaDB>('preventivoFattura', ref => ref.where('preventivoId', '==', preventivoId)
                                                                   .where('fatturaId', '==', fatturaId))
    .valueChanges();
  }

  getPreventivoFattureDB(preventivoId: string): Observable<PreventivoFatturaDB[]> {
    return this.afs.
    collection<PreventivoFatturaDB>('preventivoFattura', ref => ref.where('preventivoId', '==', preventivoId))
    .valueChanges();
  }

  postPreventivoFatturaDB(preventivoId: string, fatturaId: string): Promise<any> {
    if (this.isUserLogged) {
      return this.afs.collection('preventivoFattura').add({preventivoId: preventivoId, fatturaId: fatturaId})
             .catch(error => {
        return Promise.reject(new Error("You do not have rights to perform requested operation!"))}
      );
    }
    else
      return Promise.reject(new Error("No User Logged In!"));
  }

  deletePreventivoFatturaDB(preventivoId: string, fatturaId: string): Promise<void> {
    var db = firebase.firestore();
    if (this.isUserLogged) {
      return db.collection('preventivoFattura')
      .where('preventivoId','==', preventivoId).where('fatturaId','==', fatturaId).get()
      .then(doc => {
        doc.forEach(doc => {
          return db.doc('preventivoFattura/' + doc.id).delete()
        })
      });
    }    
    else
      return Promise.reject(new Error("No User Logged In!"));
  }

  deletePreventivoFattureDB(preventivoId: string): Promise<void> {
    var db = firebase.firestore();
    if (this.isUserLogged) {
      return db.collection('preventivoFattura')
      .where('preventivoId','==', preventivoId).get()
      .then(doc => {
        doc.forEach(doc => {
          return db.doc('preventivoFattura/' + doc.id).delete()
        })
      });
    }    
    else
      return Promise.reject(new Error("No User Logged In!"));
  }
}
