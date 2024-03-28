import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ManageUserRoleService {
    private apiUrl = environment.apiUrl; // Replace with your backend API URL
  
    constructor(private http: HttpClient) { }
  
    getAllUsers(): Observable<User[]> {
      return this.http.get<User[]>(`${this.apiUrl}/user/`);
    }

    getAllRoles(): Observable<string[]> {
        // Make an HTTP request to fetch all roles from the backend
        return this.http.get<string[]>(`${this.apiUrl}/user/roles`);
    }

    updateUserRole(userId: string, roles: string[]): Observable<User> {
        return this.http.patch<User>(`${this.apiUrl}/user/${userId}/roles`, { roles });
    }


  }