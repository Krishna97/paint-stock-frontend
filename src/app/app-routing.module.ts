import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardComponent } from './board/board.component';
import { LoginComponent } from './login/login.component';
import { ManageUserRoleComponent } from './manage-user-role/manage-user-role.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'board', component: BoardComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'manage-roles', component: ManageUserRoleComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
