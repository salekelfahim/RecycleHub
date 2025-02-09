import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface WasteItem {
  type: string;
  weight: number;
}

export interface Post {
  id: string;
  wasteItems: WasteItem[];
  wastePhotos: string[];
  status: string;
  collectionDate: string;
  city: string;
  collectionAddress: string;
  timeSlot: string;
  additionalNotes: string;
  userId: string;
}

@Injectable({
  providedIn: 'root'
})
export class CollectionService {
  private apiUrl = 'http://localhost:3000';
  private myCollectionsSubject = new BehaviorSubject<Post[]>([]);
  myCollections$ = this.myCollectionsSubject.asObservable();

  constructor(private http: HttpClient) {}

  getPendingPosts(city: string, page: number = 1, limit: number = 12): Observable<{ posts: Post[], total: number }> {
    const start = (page - 1) * limit;
    return this.http.get<Post[]>(
      `${this.apiUrl}/posts?status=pending&city=${city}&_start=${start}&_limit=${limit}&_count=true`,
      { observe: 'response' }
    ).pipe(
      map((response: HttpResponse<Post[]>) => {
        const total = parseInt(response.headers.get('X-Total-Count') || '0', 10);
        return {
          posts: response.body || [],
          total
        };
      })
    );
  }

  collectPost(postId: string, collectorId: string): Observable<Post> {
    return this.http.patch<Post>(`${this.apiUrl}/posts/${postId}`, {
      status: 'Occupied',
      collectorId
    }).pipe(
      map(updatedPost => {
        const currentCollections = this.myCollectionsSubject.value;
        this.myCollectionsSubject.next([...currentCollections, updatedPost]);
        return updatedPost;
      })
    );
  }

  getMyCollections(collectorId: string): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}/posts?collectorId=${collectorId}`);
  }
}
