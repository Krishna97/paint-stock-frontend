import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() pageTitle: string | undefined;

  constructor(private authService: AuthService, private router: Router) { }
  isAdmin = false;
  ngOnInit(): void {
    console.log ( this.authService.isAdmin());
    this.isAdmin = this.authService.isAdmin() 
  }

  logout(): void {
    this.authService.logout(); // Call the logout method from AuthService to log out the user
    this.router.navigate(['/login']); // Navigate to the login page after logout
  }

  // Navigate to the manage roles page
  manage(): void {
    this.router.navigate(['/manage-roles']);
  }

}
