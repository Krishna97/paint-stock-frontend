import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ManageUserRoleService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  // Make an HTTP request to fetch all users from the backend
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/user/`);
  }

  // Make an HTTP request to fetch all roles from the backend
  getAllRoles(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/user/roles`);
  }

  // Make an HTTP request to update the role for user
  updateUserRole(userId: string, roles: string[]): Observable<User> {
    return this.http.patch<User>(`${this.apiUrl}/user/${userId}/roles`, { roles });
  }


}