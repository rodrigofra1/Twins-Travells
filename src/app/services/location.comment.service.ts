import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LocationComment {
id?: string;
locationId: string;
comment: string;
}

@Injectable({
providedIn: 'root'
})
export class LocationCommentService {
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

addComment(data: LocationComment): Observable<LocationComment> {
    return this.http.post<LocationComment>(`${this.baseUrl}/travels/locations/comments`, data, {
    headers: this.getAuthHeaders()
    });
}

deleteComment(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/travels/locations/comments/${id}`, {
    headers: this.getAuthHeaders()
    });
}
}
