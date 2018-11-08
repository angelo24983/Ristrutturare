import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { MyNavComponent } from './my-nav/my-nav.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PreventiviComponent } from './preventivi/preventivi.component';
import { FattureComponent } from './fatture/fatture.component';

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
          { path: 'preventivi', component: PreventiviComponent },
          { path: 'fatture', component: FattureComponent }
        ]
      }
];

export const AppRoutes = RouterModule.forRoot(appRoutes);