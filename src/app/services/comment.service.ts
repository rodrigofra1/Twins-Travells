import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Comment {
  id?: string;
  travelId: string; 
  comment: string;
}

@Injectable({
  providedIn: 'root'
})
export class CommentService {
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


    addComment(data: Comment): Observable<Comment> {
    return this.http.post<Comment>(`${this.baseUrl}/travels/comments`, data, {
        headers: this.getAuthHeaders()
    });
    }

    deleteComment(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/travels/comments/${id}`, {
        headers: this.getAuthHeaders()
    });
    }
}
