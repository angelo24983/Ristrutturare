import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) {
   }

  ngOnInit() {
  }

  signInWithEmail() {
   this.authService.signInRegular(this.user.email, this.user.password)
      .then((res) => {
         console.log(res);
         this.router.navigate(['home']);
      })
      .catch((err) => console.log('error: ' + err));
  }

  signInWithFacebook() {
      this.authService.signInWithFacebook()
      .then((res) => { 
          this.router.navigate(['home'])
        })
      .catch((err) => console.log(err));
  }

}
