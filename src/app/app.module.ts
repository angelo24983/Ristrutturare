import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/auth';

import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyNavComponent } from './my-nav/my-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatInputModule, MatDatepickerModule,
         MatCardModule, MatFormFieldModule, MatNativeDateModule, 
         MatListModule, MatTableModule, MatPaginatorModule, MatSortModule, MatProgressSpinnerModule } from '@angular/material';
import { AddPreventivoComponent } from './add-preventivo/add-preventivo.component';
import { ViewPreventiviComponent } from './view-preventivi/view-preventivi.component';
import { AddFatturaComponent } from './add-fattura/add-fattura.component';
import { ViewFattureComponent } from './view-fatture/view-fatture.component';
import { LoginComponent } from './login/login.component';

import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard.service';
import { FatturaService } from './services/fattura.service';
import { PreventivoService } from './services/preventivo.service';

import { AppRoutes } from './app.routes';
import { HomePageComponent } from './home-page/home-page.component';
import { AddFatturaDialogComponent } from './view-fatture/dialogs/add/add-fattura-dialog.component';
import { DeleteFatturaDialogComponent } from './view-fatture/dialogs/delete/delete-fattura-dialog.component';
import { EditFatturaDialogComponent } from './view-fatture/dialogs/edit/edit-fattura-dialog.component';
import { EditPreventivoDialogComponent } from './view-preventivi/dialogs/edit/edit-preventivo-dialog.component';
import { DeletePreventivoDialogComponent } from './view-preventivi/dialogs/delete/delete-preventivo-dialog.component';
import { AddPreventivoDialogComponent } from './view-preventivi/dialogs/add/add-preventivo-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    MyNavComponent,
    AddPreventivoComponent,
    ViewPreventiviComponent,
    AddFatturaComponent,
    ViewFattureComponent,
    LoginComponent,
    HomePageComponent,
    AddFatturaDialogComponent,
    DeleteFatturaDialogComponent,
    EditFatturaDialogComponent,
    EditPreventivoDialogComponent,
    DeletePreventivoDialogComponent,
    AddPreventivoDialogComponent
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
    AppRoutes,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    FormsModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  providers: [ AuthService, AuthGuard, FatturaService, PreventivoService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
