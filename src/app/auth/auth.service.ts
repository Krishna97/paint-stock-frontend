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

  getUserRole(): string | null {
    return localStorage.getItem('role');
  }

  isPainter(): boolean {
    const role = this.getUserRole();
    return role === this.Role.Painter;
  }

  isManager(): boolean {
    const role = this.getUserRole();
    return role === this.Role.Manager;
  }

  isViewer(): boolean {
    const role = this.getUserRole();
    return role === this.Role.Viewer;
  }

  isAdmin(): boolean {
    const role = this.getUserRole();
    return role === this.Role.Admin;
  }

  // Add more methods for other roles or permissions as needed
}
