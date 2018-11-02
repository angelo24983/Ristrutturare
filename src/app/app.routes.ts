import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { MyNavComponent } from './my-nav/my-nav.component';
import { HomePageComponent } from './home-page/home-page.component';
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
          { path:'', redirectTo: 'home-page', pathMatch: 'full' },
          { path: 'home-page', component: HomePageComponent },  
          { path: 'add-preventivo', component: AddPreventivoComponent },
          { path: 'view-preventivi', component: ViewPreventiviComponent },
          { path: 'add-fattura', component: AddFatturaComponent },
          { path: 'view-fatture', component: ViewFattureComponent }
        ]
      }
];

export const AppRoutes = RouterModule.forRoot(appRoutes);