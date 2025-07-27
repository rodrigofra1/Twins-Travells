import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Location {
  id?: string;
  travelId: string;
  description: string;
  type: string;
  state: string;
  map?: string;
  startAt?: string | null;
  endAt?: string | null;
  createdBy?: string;
  prop1?: string;
  prop2?: string;
  prop3?: string;
}

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private baseUrl = 'https://mobile-api-one.vercel.app/api';

  private username = 'rodrigofrancisco@ipvc.pt';
  private password = 'J9@yTp7F';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const auth = btoa(`${this.username}:${this.password}`);
    return new HttpHeaders({
      'Authorization': `Basic ${auth}`
    });
  }

getLocationsByTravelId(travelId: string): Observable<Location[]> {
  return this.http.get<Location[]>(`${this.baseUrl}/travels/${travelId}/locations`, {
    headers: this.getAuthHeaders()
  });
}


  createLocation(data: Location): Observable<Location> {
    const body = {
      ...data,
      startAt: data.startAt ? new Date(data.startAt).toISOString() : null,
      endAt: data.endAt ? new Date(data.endAt).toISOString() : null,
    };
    return this.http.post<Location>(`${this.baseUrl}/travels/locations`, body, {
      headers: this.getAuthHeaders()
    });
  }


}
