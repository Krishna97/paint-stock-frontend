// notification.service.ts

import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private snackBar: MatSnackBar) { }

  /**
   * Display an error message using MatSnackBar.
   * @param message Error message to be displayed.
   */
  showError(message: string): void {
    this.openSnackBar(message, 'error-snackbar');
  }

  // Open snackbar with specified message, panel class, and duration
  private openSnackBar(message: string, panelClass: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      panelClass: [panelClass],
      horizontalPosition: 'end',
      verticalPosition: 'top'
    });
  }

}
