import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { loadPosts, collectPost } from '../../../store/post.actions';
import {selectPosts, selectError, selectLoading} from '../../../store/post.selectors';
import { Observable } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import {AsyncPipe, NgClass, NgForOf} from '@angular/common';

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

@Component({
  selector: 'app-collections',
  standalone: true,
  imports: [
    NgForOf,
    NgClass,
    AsyncPipe
  ],
  templateUrl: './collections.component.html',
  styleUrl: './collections.component.css'
})
export class CollectionsComponent implements OnInit {
  posts$: Observable<Post[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  currentPage = 1;
  totalPages = 1;
  selectedType = 'All';
  wasteTypes = ['Plastic', 'Paper', 'Glass', 'Metal', 'Electronics'];
  collectorCity: string = '';

  constructor(
    private store: Store,
    private authService: AuthService
  ) {
    this.posts$ = this.store.select(selectPosts);
    this.loading$ = this.store.select(selectLoading);
    this.error$ = this.store.select(selectError);
  }

  ngOnInit() {
    const collector = this.authService.getUser();
    this.collectorCity = collector.city;
    this.loadPosts();
  }

  loadPosts() {
    this.store.dispatch(loadPosts({ city: this.collectorCity, page: this.currentPage }));
  }

  collectPost(postId: string) {
    const collectorId = this.authService.getUser().id;
    this.store.dispatch(collectPost({ postId, collectorId }));
    this.store.dispatch(loadPosts({ city: this.collectorCity, page: this.currentPage }));
  }


}
