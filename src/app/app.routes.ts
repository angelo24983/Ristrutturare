import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { MyNavComponent } from './my-nav/my-nav.component';
import { AddPreventivoComponent } from './add-preventivo/add-preventivo.component';
import { ViewPreventiviComponent } from './view-preventivi/view-preventivi.component';
import { AddFatturaComponent } from './add-fattura/add-fattura.component';
import { ViewFattureComponent } from './view-fatture/view-fatture.component';

import { AuthGuard } from './services/auth-guard.service';

const appRoutes: Routes = [
    {
        path: '',
        component: LoginComponent
    },
    { 
        path: 'home', canActivate: [AuthGuard], component: MyNavComponent, children: [
          { path: 'add-preventivo', canActivate: [AuthGuard], component: AddPreventivoComponent },
          { path: 'view-preventivi', canActivate: [AuthGuard], component: ViewPreventiviComponent },
          { path: 'add-fattura', canActivate: [AuthGuard], component: AddFatturaComponent },
          { path: 'view-fatture', canActivate: [AuthGuard], component: ViewFattureComponent }
        ]
      }
];

export const AppRoutes = RouterModule.forRoot(appRoutes);