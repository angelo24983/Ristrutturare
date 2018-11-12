import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AuthService } from '../services/auth.service';
import { Pagamento } from '../shared/pagamento';
import { Observable } from 'rxjs';
import { delay, catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PagamentoService {

   private isUserLogged: boolean = false;

  constructor(private db: AngularFirestore,
    private authService: AuthService ) {
    this.isUserLogged = this.authService.isLoggedIn();
  }

  getPagamenti(): Observable<Pagamento[]> {
    return this.db.collection<Pagamento>('pagamenti').snapshotChanges()
    .pipe(
      map(actions => {
        return actions.map(action => {
        const data = action.payload.doc.data() as Pagamento;
        const _id = action.payload.doc.id;
        return { _id, ...data };
        });
      })
    );
  }

  getPagamento(id: string): Observable<Pagamento> {
    return this.db.doc<Pagamento>('fatture/'+ id).snapshotChanges()
    .pipe(
      map(action => {
        const data = action.payload.data() as Pagamento;
        const _id = action.payload.id;
        return { _id, ...data };
      })
    );
  }

  postPagamento(pagamento: any): Promise<any> {
    if (this.isUserLogged) {
      return this.db.collection('/pagamenti').add(pagamento);
    }
    else
      return Promise.reject(new Error("No User Logged In!"));
  }

  updatePagamento(pagamento: any): Promise<any> {
    if (this.isUserLogged) {
      let taskDoc: AngularFirestoreDocument<Pagamento>;
      taskDoc = this.db.doc('pagamenti/' + pagamento._id);
      return taskDoc.update(pagamento);
    }
    else
      return Promise.reject(new Error("No User Logged In!"));
  }

  deletePagamento(id: string): Promise<void> {
    if (this.isUserLogged) {
      return this.db.doc('pagamenti/' + id).delete();
    }    
    else
      return Promise.reject(new Error("No User Logged In!"));
  }
}
