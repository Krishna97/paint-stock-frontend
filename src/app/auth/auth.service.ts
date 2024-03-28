import { Injectable } from '@angular/core';
import { ManageUserRoleService } from '../manage-user-role/manage-user-role.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  RoleConst = {
    "Painter": 'painter',
    "Manager": 'manager',
    "Viewer": 'viewer',
    "Admin": 'admin',
  }

  private baseUrl = environment.apiUrl;
  constructor(private manageUserRoleService: ManageUserRoleService, private http: HttpClient, private router: Router) { }

  getUserRoles(): string | null {
    return localStorage.getItem('roles');
  }

  isPainter(): boolean {
    const roles = this.getUserRoles();
    return roles?.includes(this.RoleConst.Painter) ? true : false;
  }

  isManager(): boolean {
    const roles = this.getUserRoles();
    return roles?.includes(this.RoleConst.Manager) ? true : false;
  }

  isViewer(): boolean {
    const roles = this.getUserRoles();
    return roles?.includes(this.RoleConst.Viewer) ? true : false;
  }

  isAdmin(): boolean {
    const roles = this.getUserRoles();
    return roles?.includes(this.RoleConst.Admin) ? true : false;
  }

  logout(): void {
    this.http.post(`${this.baseUrl}/auth/logout`, {}).subscribe(() => {
      // Clear user session/token
      localStorage.removeItem('token');
      localStorage.removeItem('roles');
      // Redirect to login page
      this.router.navigate(['/login']);
    });
  }
}
