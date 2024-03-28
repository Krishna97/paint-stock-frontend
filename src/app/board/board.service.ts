import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Paint, PaintResponse } from '../paint-response.interface';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class BoardService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // Retrieve paints from the server
  getPaints(): Observable<PaintResponse> {
    return this.http.get<PaintResponse>(`${this.baseUrl}/paint/getPaints`);
  }

  // Update paint status on the server
  changeStatus(paint: Paint) {
    return this.http.put<Paint>(`${this.baseUrl}/paint/${paint.id}/update`, paint);
  }
}
