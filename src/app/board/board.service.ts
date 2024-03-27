import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Paint, PaintResponse } from '../paint-response.interface';


@Injectable({
  providedIn: 'root'
})
export class BoardService {
  private baseUrl = 'http://localhost:3100'; // Change this URL according to your NestJS backend

  constructor(private http: HttpClient) { }

//   getPaints(): Observable<any[]> {
//     return this.http.get<any[]>(this.baseUrl);
//   }

  getPaints(): Observable<PaintResponse> {
    return this.http.get<PaintResponse>(`${this.baseUrl}/paint/getPaints`);
  }

  changeStatus(paint: Paint){
    return this.http.put<Paint>(`${this.baseUrl}/paint/${paint.id}/update`, paint);
  }
}
