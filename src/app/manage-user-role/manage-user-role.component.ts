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
    this.getUsers();
    this.getRoles();
     // Check if the logged-in user is an admin, redirect and show error if not
    if (!this.authService.isAdmin()) {
      this.router.navigate(['/board']);
      this.notificationService.showError('Unauthorized access. You do not have an access.');
    }

  }

  // Fetches all users from the backend and updates the local users array
  getUsers() {
    this.manageUserRoleService.getAllUsers().subscribe((users: User[]) => {
      this.users = users;
    });
  }

  // Fetches all roles from the backend and updates the local roles array
  getRoles() {
    this.manageUserRoleService.getAllRoles().subscribe((roles: string[]) => {
      this.roles = roles;
      return roles;
    });
  }

  // Updates the role of a user based on user action (checkbox check/uncheck)
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

  // Event handler for role checkbox change
  onRoleChange(user: User, role: string, event: any) {
    const checked = event.target.checked;
  }

  // Utility function to check if a role is assigned to a user (for checkbox state)
  isRoleChecked(user: User, role: string): boolean {
    return user.roles.includes(role);
  }

  // Navigates back to the '/board' page
  back(): void {
    this.router.navigate(['/board']);
  }

}

