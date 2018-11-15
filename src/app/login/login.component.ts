import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  showSpinner: boolean = false;

  user = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) {
   }

  ngOnInit() {
  }

  signInWithEmail() {
    this.showSpinner = true;
    this.authService.signInRegular(this.user.email, this.user.password)
      .then((res) => {
         this.router.navigate(['home']);
         this.showSpinner = false;
      })
      .catch((err) => console.log('error: ' + err));
  }

  signInWithFacebook() {
    this.showSpinner = true;
      this.authService.signInWithFacebook()
      .then((res) => {
          this.router.navigate(['home'])
          this.showSpinner = false;
        })
      .catch((err) => console.log(err));
  }

}
