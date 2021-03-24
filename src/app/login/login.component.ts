import { Component, OnInit ,Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

user_name='SignIn'
   username = ''
  password = ''
  invalidLogin = false
  @Input() loggedInStatus = false
  @Input() error: string | null;
  hide = true;



  constructor(private router: Router,
    private loginservice: AuthenticationService) { 
      
    }

  ngOnInit(): void {
  }

  

  checkLogin() {
    (this.loginservice.authenticate(this.username, this.password).subscribe(
      data => {
        this.router.navigate([''])
        this.invalidLogin = false
        this.loggedInStatus = true
        this.username = this.username;
        console.log("username: "+this.username);
      },
      error => {
        this.invalidLogin = true
        this.loggedInStatus = false;
        this.error = error.message;

      }
    )
    );
    
  }
  
}
