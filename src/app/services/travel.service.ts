import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Travel {
  id?: string;
  description: string;
  type: 'high' | 'normal' | 'low'; 
  state: 'to-do' | 'done';          
  startAt?: string | null;
  endAt?: string | null;
  createdBy?: string;
  prop1?: string;
  prop2?: string;
  prop3?: string;
  isFav?: boolean; 
}


@Injectable({
  providedIn: 'root'
})
export class TravelService {
  private baseUrl = 'https://mobile-api-one.vercel.app';

  private username = 'rodrigofrancisco@ipvc.pt';
  private password = 'J9@yTp7F';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const auth = btoa(`${this.username}:${this.password}`);
    return new HttpHeaders({
      'Authorization': `Basic ${auth}`
    });
  }

  getTravels(): Observable<Travel[]> {
    return this.http.get<Travel[]>(`${this.baseUrl}/api/travels`, {
      headers: this.getAuthHeaders()
    });
  }

  getTravelById(id: string): Observable<Travel> {
    return this.http.get<Travel>(`${this.baseUrl}/api/travels/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  createTravel(data: Travel): Observable<Travel> {
    const body = {
      ...data,
      startAt: data.startAt ? new Date(data.startAt).toISOString() : null,
      endAt: data.endAt ? new Date(data.endAt).toISOString() : null,
    };
    return this.http.post<Travel>(`${this.baseUrl}/api/travels`, body, {
      headers: this.getAuthHeaders()
    });
  }

  updateTravel(id: string, data: Travel): Observable<Travel> {
    return this.http.put<Travel>(`${this.baseUrl}/api/travels/${id}`, data, {
      headers: this.getAuthHeaders()
    });
  }

  deleteTravel(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/api/travels/${id}`, {
      headers: this.getAuthHeaders()
    });
  }
}
