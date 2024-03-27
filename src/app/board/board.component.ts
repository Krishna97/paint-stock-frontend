import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { ChangeDetectorRef } from '@angular/core';
import { BoardService } from './board.service';
import { Paint, PaintResponse } from '../paint-response.interface';

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
  // tasks = [
  //   { id: 1, color: 'Task 1', status: 'todo' },
  //   { id: 2, color: 'Task 2', status: 'inprogress' },
  //   { id: 3, color: 'Task 3', status: 'done' }
  // ];

  // constructor() { }

 
  // tasks: Task[] = [
  //   {color: 'Task 1', status: 'outOfStock' },
  //   {color: 'Task 2', status: 'runningLow' },
  //   {color: 'Task 3', status: 'available' },
  //   {color: 'Task 4', status: 'available' }
  // ];

  paints: Paint[] = []; 

  constructor(private boardService: BoardService, private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getPaints();
  }

  getPaints(){
    this.boardService.getPaints().subscribe((response: PaintResponse) => {
      this.paints = response.response; // Access the 'response' property
    }, (error) => {
      console.error('An error occurred:', error);
    });
  }


  onDragStart(event: DragEvent, paint: Paint) {
    event.dataTransfer?.setData('paint', JSON.stringify(paint));
    console.log("Inside method" + "onDragStart " );
  }

  onDrop(event: DragEvent, status: string) {
    event.preventDefault();
    const paint: Paint = JSON.parse(event.dataTransfer?.getData('paint') || '');
    paint.status = status;

    this.boardService.changeStatus(paint).subscribe((response: any) => {
      console.log(response);
      this.getPaints();
    })

    
    //this.updatePaint(paint);

    // Trigger change detection
    //this.cdRef.detectChanges();
  }

  // updatePaint(paintToUpdate: Paint) {
  //   if(this.paints != undefined){
  //     const index = this.paints.findIndex(paint => paint.color === paintToUpdate.color);
  //     if (index !== -1) {
  //       this.paints[index] = paintToUpdate;
  //     }
  //   }
    
  // }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    console.log("Inside method" + "onDragOver " );
  }

  filterPaints(status: string): Paint[] {
    if(this.paints != undefined){
      return this.paints.filter(paint => paint.status === status);
      console.log("Inside method" + " filterTasks" );
    }
    return [];
    
  }

}

