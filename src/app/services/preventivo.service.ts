import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AuthService } from '../services/auth.service';
import { Preventivo } from '../shared/preventivo';
import { Observable, of } from 'rxjs';
import { delay, catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PreventivoService {

  private isUserLogged: boolean = false;

  constructor(private db: AngularFirestore,
    private authService: AuthService ) {
    this.isUserLogged = this.authService.isLoggedIn();
  }

  getPreventivi(): Observable<Preventivo[]> {
    return this.db.collection<Preventivo>('preventivi').snapshotChanges()
    .pipe(
      map(actions => {
        return actions.map(action => {
        const data = action.payload.doc.data() as Preventivo;
        const _id = action.payload.doc.id;
        return { _id, ...data };
        });
      }),
      catchError(this.handleError<Preventivo[]>('getFatturi'))
    );
  }

  getPreventivo(id: string): Observable<Preventivo> {
    return this.db.doc<Preventivo>('preventivi/'+ id).snapshotChanges()
    .pipe(
      map(action => {
        const data = action.payload.data() as Preventivo;
        const _id = action.payload.id;
        return { _id, ...data };
      }),
      catchError(this.handleError<Preventivo>('getPreventivo'))
    );
  }

  postPreventivo(preventivo: any): Promise<any> {
    if (this.isUserLogged) {
      return this.db.collection('preventivi').add(preventivo).catch(error => {
        return Promise.reject(new Error("You do not have rights to perform requested operation!"))}
      );
    }
    else
      return Promise.reject(new Error("No User Logged In!"));
  }

  updatePreventivo(preventivo: any): Promise<any> {
    if (this.isUserLogged) {
      let taskDoc: AngularFirestoreDocument<Preventivo>;
      taskDoc = this.db.doc('preventivi/' + preventivo._id);
      return taskDoc.update(preventivo).catch(error => {
        return Promise.reject(new Error("You do not have rights to perform requested operation!"))}
      );
    }
    else
      return Promise.reject(new Error("No User Logged In!"));
  }

  deletePreventivo(id: string): Promise<void> {
    if (this.isUserLogged) {
      return this.db.doc('preventivi/' + id).delete().catch(error => {
        return Promise.reject(new Error("You do not have rights to perform requested operation!"))}
      );
    }    
    else
      return Promise.reject(new Error("No User Logged In!"));
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
 
      //console.error(error); // log to console instead
 
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}