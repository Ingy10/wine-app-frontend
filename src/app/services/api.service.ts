import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Wine } from '../interfaces/Wine.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUrl = 'http://localhost:8080/api'; // TODO: Change when deploying

  constructor(private http: HttpClient) {}

  // GET all wines
  getAllWines(): Observable<Wine[]> {
    return this.http.get<Wine[]>(`${this.baseUrl}/wines`);
  }

  // POST wines
  PostWines(wine: Wine): Observable<Wine> {
    return this.http.post<Wine>(`${this.baseUrl}/wines`, wine);
  }

  // PUT wines
  PutWines(id: number, wine: Wine): Observable<Wine> {
    return this.http.put<Wine>(`${this.baseUrl}/wines/${id}`, wine);
  }

  // DELETE a wine
  deleteWine(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/wines/${id}`);
  }
}
