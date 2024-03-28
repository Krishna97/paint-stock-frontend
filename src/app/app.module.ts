import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BoardComponent } from './board/board.component';
import { FilterByStatusPipe } from './filter-by-status.pipe';
import { MatTabsModule } from '@angular/material/tabs';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { AuthInterceptor } from './auth/auth.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ManageUserRoleComponent } from './manage-user-role/manage-user-role.component';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { HeaderComponent } from './header/header.component';
import { UnauthorizedInterceptor } from './auth/auth.unauthorizedIntercepror';


@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    FilterByStatusPipe,
    LoginComponent,
    ManageUserRoleComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    HttpClientModule,
    FormsModule,
    MatSnackBarModule,
    MatCardModule,
    MatCheckboxModule,
    MatListModule,
    MatTableModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: UnauthorizedInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
