import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string = '';
  password: string = '';
  loginError: string = '';

  constructor(private loginService: LoginService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.loginError = params['error'] || ''; // Set login error message
    });
  }

  login(): void {
    // Add login logic here
    if (localStorage.length <= 0) {
      this.router.navigate(['/login']);
    }

    //Reset error
    this.loginError = '';

    this.loginService.login(this.username, this.password).subscribe(response => {
      // Handle successful login
      if (response.token != undefined) {
        // Extract token from response
        const token = response.token;

        localStorage.setItem('token', token);

        if (response.user != undefined && response.user.roles != undefined) {
          localStorage.setItem('roles', response.user.roles);
        }

        this.router.navigate(['/board']);
      }

    }, error => {
      // Handle login error
      console.error('Login failed:', error);
      this.loginError = 'Invalid username or password. Please try again.'; // Set error message

      // Redirect to login page with error message as query parameter
      this.router.navigate(['/login'], { queryParams: { error: this.loginError } });
    });
  }

}
