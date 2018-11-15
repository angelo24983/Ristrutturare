import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AuthService } from '../services/auth.service';
import { Tipologia } from '../shared/tipologia';
import { Observable, of } from 'rxjs';
import { delay, catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TipologiaService {

  private isUserLogged: boolean = false;

  constructor(private db: AngularFirestore,
    private authService: AuthService ) {
    this.isUserLogged = this.authService.isLoggedIn();
  }

  getTipologie(): Observable<Tipologia[]> {
    return this.db.collection<Tipologia>('tipologie').snapshotChanges()
    .pipe(
      map(actions => {
        return actions.map(action => {
        const data = action.payload.doc.data() as Tipologia;
        const _id = action.payload.doc.id;
        return { _id, ...data };
        });
      }),
      catchError(this.handleError<Tipologia[]>('getFatturi'))
    );
  }

  getTipologia(id: string): Observable<Tipologia> {
    return this.db.doc<Tipologia>('tipologie/'+ id).snapshotChanges()
    .pipe(
      map(action => {
        const data = action.payload.data() as Tipologia;
        const _id = action.payload.id;
        return { _id, ...data };
      }),
      catchError(this.handleError<Tipologia>('getTipologia'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
 
      console.error(error); // log to console instead
 
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}