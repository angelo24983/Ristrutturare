import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../services/auth.service';
import { Preventivo } from '../shared/preventivo';
import { Observable } from 'rxjs';
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
      })
    );
  }

  getPreventivo(id: string): Observable<Preventivo> {
    return this.db.doc<Preventivo>('preventivi/'+ id).snapshotChanges()
    .pipe(
      map(action => {
        const data = action.payload.data() as Preventivo;
        const _id = action.payload.id;
        return { _id, ...data };
      })
    );
  }

  postPreventivo(preventivo: any): Promise<any> {
    if (this.isUserLogged) {
      return this.db.collection('preventivi').add(preventivo);
    }
    else
      return Promise.reject(new Error("No User Logged In!"));
  }
}
