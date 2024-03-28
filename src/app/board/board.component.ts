import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { BoardService } from './board.service';
import { Paint, PaintResponse } from '../paint-response.interface';
import { AuthService } from '../auth/auth.service';
import { NotificationService } from '../notification/notification.service';

// export interface Paint {
//   id: number;
//   color: string;
//   status: string;
// }

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  // imports: [RouterOutlet, CommonModule],
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  paints: Paint[] = [];

  constructor(private authService: AuthService, private boardService: BoardService, private cdRef: ChangeDetectorRef,
    private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.getPaints();
  }

  // Fetch paints data from the server
  getPaints() {
    this.boardService.getPaints().subscribe((response: PaintResponse) => {
      this.paints = response.response; // Access the 'response' property
    }, (error) => {
      console.error('An error occurred:', error);
    });
  }

  // Handle drag start event
  onDragStart(event: DragEvent, paint: Paint) {
    event.dataTransfer?.setData('paint', JSON.stringify(paint));
  }

  // Handle drop event
  onDrop(event: DragEvent, status: string) {
    event.preventDefault();
    if (this.authService.isManager() || this.authService.isPainter()) {
      const paint: Paint = JSON.parse(event.dataTransfer?.getData('paint') || '');
      paint.status = status;

      this.boardService.changeStatus(paint).subscribe((response: any) => {
        this.getPaints();
      })
    } else {
      this.notificationService.showError('Unauthorized access. You do not have an access to perform this action.');
    }

  }

  // Handle drag over event
  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  // Filter paints based on status
  filterPaints(status: string): Paint[] {
    if (this.paints != undefined) {
      return this.paints.filter(paint => paint.status === status);
    }
    return [];

  }

}

