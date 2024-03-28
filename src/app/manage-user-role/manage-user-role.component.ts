import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { ManageUserRoleService } from './manage-user-role.service';
import { AuthService } from '../auth/auth.service';
import { NotificationService } from '../notification/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-user-role',
  templateUrl: './manage-user-role.component.html',
  styleUrls: ['./manage-user-role.component.css']
})
export class ManageUserRoleComponent implements OnInit {

    users: User[] = [];
    roles: string[] = [];

    constructor(private router: Router, private authService: AuthService, private manageUserRoleService: ManageUserRoleService, private notificationService: NotificationService) { }

    ngOnInit(): void {
      if (!this.authService.isAdmin()) {
        this.router.navigate(['/board']);
        this.notificationService.showError('Unauthorized access. You do not have an access.');
      } else{
        this.getUsers();
        this.getRoles();
      }
      
    }

    getUsers() {
      this.manageUserRoleService.getAllUsers().subscribe((users: User[]) => {
        this.users = users;
      });
    }

    getRoles() {
      // Call a method in UserService to fetch all roles
      this.manageUserRoleService.getAllRoles().subscribe((roles: string[]) => {
        this.roles = roles;
      });
    }

    updateUserRole(user: User, role: string, checked: boolean) {
      const updatedRoles = checked ? [...user.roles, role] : user.roles.filter(r => r !== role);
      this.manageUserRoleService.updateUserRole(user.id, updatedRoles).subscribe(updatedUser => {
        // Update the user with the new roles in the local array
        const index = this.users.findIndex(u => u.id === updatedUser.id);
        if (index !== -1) {
          this.users[index] = updatedUser;
        }
      });
    }

    // manage-user-role.component.ts

    onRoleChange(user: User, role: string, event: any) {
      const checked = event.target.checked;
      // Update user role logic
    }

    isRoleChecked(user: User, role: string): boolean {
      return user.roles.includes(role);
    }
  
  }

