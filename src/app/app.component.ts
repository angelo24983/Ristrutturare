import { Component, AfterViewInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { SwUpdate } from '@angular/service-worker';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'Ristrutturare';

  constructor(private swUpdate: SwUpdate, private snackBar: MatSnackBar) {
    console.log('[App]', environment. version);
  }

   ngAfterViewInit() {
    if (this.swUpdate.isEnabled) {
      console.log('[App] Checking swUpdate...');

      this.swUpdate.available.subscribe(event => {
        console.log(
          '[App] Update available: current version is',
          event.current,
          'available version is',
          event.available
        );
        const snackBarRef = this.snackBar.open(
          'Nuova versione disponibile',
          'Aggiorna'
        );
        snackBarRef.onAction().subscribe(() => this.activateUpdate());
      });
    } else {
      console.log('[App] swUpdate.isEnabled', false);
    }
  }

  checkForUpdate() {
    console.log('[App] checkForUpdate started');
    this.swUpdate
      .checkForUpdate()
      .then(() => console.log('[App] checkForUpdate completed'))
      .catch(err => console.error('[App] checkForUpdate error', err));
  }

  activateUpdate() {
    console.log('[App] activateUpdate started');
    this.swUpdate
      .activateUpdate()
      .then(() => {
        console.log('[App] activateUpdate completed');
        document.location.reload();
      })
      .catch(err => console.error('[App] activateUpdate error', err));
  }
}
