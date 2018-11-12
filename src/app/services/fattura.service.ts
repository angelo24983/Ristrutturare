import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AuthService } from '../services/auth.service';
import { Fattura } from '../shared/fattura';
import { Observable } from 'rxjs';
import { delay, catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FatturaService {

  private isUserLogged: boolean = false;

  constructor(private db: AngularFirestore,
    private authService: AuthService ) {
    this.isUserLogged = this.authService.isLoggedIn();
  }

  getFatture(): Observable<Fattura[]> {
    return this.db.collection<Fattura>('fatture').snapshotChanges()
    .pipe(
      map(actions => {
        return actions.map(action => {
        const data = action.payload.doc.data() as Fattura;
        const _id = action.payload.doc.id;
        return { _id, ...data };
        });
      })
    );
  }

  getFattura(id: string): Observable<Fattura> {
    return this.db.doc<Fattura>('fatture/'+ id).snapshotChanges()
    .pipe(
      map(action => {
        const data = action.payload.data() as Fattura;
        const _id = action.payload.id;
        return { _id, ...data };
      })
    );
  }

  postFattura(fattura: any): Promise<any> {
    if (this.isUserLogged) {
      return this.db.collection('/fatture').add(fattura);
    }
    else
      return Promise.reject(new Error("No User Logged In!"));
  }

  updateFattura(fattura: any): Promise<any> {
    if (this.isUserLogged) {
      let taskDoc: AngularFirestoreDocument<Fattura>;
      taskDoc = this.db.doc('fatture/' + fattura._id);
      return taskDoc.update(fattura);
    }
    else
      return Promise.reject(new Error("No User Logged In!"));
  }

  deleteFattura(id: string): Promise<void> {
    if (this.isUserLogged) {
      return this.db.doc('fatture/' + id).delete();
    }    
    else
      return Promise.reject(new Error("No User Logged In!"));
  }

  pagaFattura(pagaFatturaForm: any): Promise<any> {
    if (this.isUserLogged) {
      let taskDoc: AngularFirestoreDocument<Fattura>;
      taskDoc = this.db.doc('fatture/' + pagaFatturaForm._id);
      return taskDoc.update(pagaFatturaForm);
    }
    else
      return Promise.reject(new Error("No User Logged In!"));
  }
}