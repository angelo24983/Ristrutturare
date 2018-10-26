import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { MatCardModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyNavComponent } from './my-nav/my-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { AddPreventivoComponent } from './add-preventivo/add-preventivo.component';
import { ViewPreventiviComponent } from './view-preventivi/view-preventivi.component';
import { AddFatturaComponent } from './add-fattura/add-fattura.component';
import { ViewFattureComponent } from './view-fatture/view-fatture.component';

@NgModule({
  declarations: [
    AppComponent,
    MyNavComponent,
    AddPreventivoComponent,
    ViewPreventiviComponent,
    AddFatturaComponent,
    ViewFattureComponent
  ],
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    RouterModule.forRoot([
      {
        path: '', component: MyNavComponent, children: [
          { path: 'add-preventivo', component: AddPreventivoComponent },
          { path: 'view-preventivi', component: ViewPreventiviComponent },
          { path: 'add-fattura', component: AddFatturaComponent },
          { path: 'view-fatture', component: ViewFattureComponent }
        ]
      }
    ]),
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    FormsModule,
    MatNativeDateModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
