import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AuthService } from '../services/auth.service';
import { Iva } from '../shared/iva';
import { Observable, of } from 'rxjs';
import { delay, catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IvaService {

  private isUserLogged: boolean = false;

  constructor(private db: AngularFirestore,
    private authService: AuthService ) {
    this.isUserLogged = this.authService.isLoggedIn();
  }

  getValoriIva(): Observable<Iva[]> {
    return this.db.collection<Iva>('iva').snapshotChanges()
    .pipe(
      map(actions => {
        return actions.map(action => {
        const data = action.payload.doc.data() as Iva;
        const _id = action.payload.doc.id;
        return { _id, ...data };
        });
      }),
      catchError(this.handleError<Iva[]>('getValoriIva'))
    );
  }

  getIva(id: string): Observable<Iva> {
    return this.db.doc<Iva>('iva/'+ id).snapshotChanges()
    .pipe(
      map(action => {
        const data = action.payload.data() as Iva;
        const _id = action.payload.id;
        return { _id, ...data };
      }),
      catchError(this.handleError<Iva>('getIva'))
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