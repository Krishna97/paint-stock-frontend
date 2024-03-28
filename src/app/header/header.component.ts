import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  // Input property to receive the page title from parent component
  @Input() pageTitle: string | undefined;

  constructor(private authService: AuthService, private router: Router) { }
  isAdmin = false;

  // Update isAdmin property based on user role
  ngOnInit(): void {
    console.log(this.authService.isAdmin());
    this.isAdmin = this.authService.isAdmin()
  }

  // Navigate to the login page after logout
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  // Navigate to the manage roles page
  manage(): void {
    this.router.navigate(['/manage-roles']);
  }

}
