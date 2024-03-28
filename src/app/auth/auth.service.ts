// auth.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    Role = {
        "Painter" : 'painter',
        "Manager" : 'manager',
        "Viewer" : 'viewer',
        "Admin" : 'admin',
    }
  constructor() { }

  getUserRoles(): string | null {
    return localStorage.getItem('roles');
  }

  isPainter(): boolean {
    const roles = this.getUserRoles();
    return roles?.includes(this.Role.Painter) ? true : false;
  }

  isManager(): boolean {
    const role = this.getUserRoles();
    return role === this.Role.Manager;
  }

  isViewer(): boolean {
    const role = this.getUserRoles();
    return role === this.Role.Viewer;
  }

  isAdmin(): boolean {
    const role = this.getUserRoles();
    return role === this.Role.Admin;
  }

  // Add more methods for other roles or permissions as needed
}
