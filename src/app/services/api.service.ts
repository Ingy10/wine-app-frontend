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

  getAllWines(): Observable<Wine[]> {
    return this.http.get<Wine[]>(`${this.baseUrl}/wines`);
  }
}
