import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
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
}