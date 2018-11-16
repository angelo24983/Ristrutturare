import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeItIt from '@angular/common/locales/it';
import { RouterModule, Routes } from '@angular/router';

import { ServiceWorkerModule } from '@angular/service-worker';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/auth';

import { AppComponent } from './app.component';

import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyNavComponent } from './my-nav/my-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatSelectModule, MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatInputModule, MatDatepickerModule,
         MatCheckboxModule, MatCardModule, MatFormFieldModule, MatNativeDateModule, MatMenuModule, MatListModule,
         MatTableModule, MatPaginatorModule, MatSortModule, MatProgressSpinnerModule, MatDialogModule, MatSnackBarModule,
         MAT_DATE_LOCALE } from '@angular/material';

// Import your AvatarModule
import { AvatarModule } from 'ngx-avatar';

import { PreventiviComponent } from './preventivi/preventivi.component';
import { FattureComponent } from './fatture/fatture.component';
import { LoginComponent } from './login/login.component';

import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard.service';
import { FatturaService } from './services/fattura.service';
import { PreventivoService } from './services/preventivo.service';

import { AppRoutes } from './app.routes';
import { RiepilogoComponent } from './riepilogo/riepilogo.component';
import { AddFatturaDialogComponent } from './fatture/dialogs/add/add-fattura-dialog.component';
import { DeleteFatturaDialogComponent } from './fatture/dialogs/delete/delete-fattura-dialog.component';
import { DetailsFatturaDialogComponent } from './fatture/dialogs/details/details-fattura-dialog.component';
import { EditFatturaDialogComponent } from './fatture/dialogs/edit/edit-fattura-dialog.component';
import { PagaFatturaDialogComponent } from './fatture/dialogs/paga/paga-fattura-dialog.component';
import { AddPreventivoDialogComponent } from './preventivi/dialogs/add/add-preventivo-dialog.component';
import { DeletePreventivoDialogComponent } from './preventivi/dialogs/delete/delete-preventivo-dialog.component';
import { DetailsPreventivoDialogComponent } from './preventivi/dialogs/details/details-preventivo-dialog.component';
import { EditPreventivoDialogComponent } from './preventivi/dialogs/edit/edit-preventivo-dialog.component';


registerLocaleData(localeItIt);

@NgModule({
  declarations: [
    AppComponent,
    MyNavComponent,
    PreventiviComponent,
    FattureComponent,
    LoginComponent,
    RiepilogoComponent,
    AddFatturaDialogComponent,
    DeleteFatturaDialogComponent,
    EditFatturaDialogComponent,
    DetailsFatturaDialogComponent,
    PagaFatturaDialogComponent,
    AddPreventivoDialogComponent,
    DeletePreventivoDialogComponent,
    DetailsPreventivoDialogComponent,
    EditPreventivoDialogComponent
  ],
  entryComponents: [AddFatturaDialogComponent,
    DeleteFatturaDialogComponent,
    EditFatturaDialogComponent,
    DetailsFatturaDialogComponent,
    PagaFatturaDialogComponent,
    AddPreventivoDialogComponent,
    DeletePreventivoDialogComponent,
    DetailsPreventivoDialogComponent,
    EditPreventivoDialogComponent
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
    MatCheckboxModule,
    MatDialogModule,
    MatMenuModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AvatarModule
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'it-IT'},
    {provide: LOCALE_ID, useValue: 'it-IT'},
    AuthService,
    AuthGuard,
    FatturaService,
    PreventivoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
