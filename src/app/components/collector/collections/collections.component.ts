import { Component, OnInit } from '@angular/core';
import { CollectionService } from "../../../services/collection.service";
import { AuthService } from "../../../services/auth.service";
import {NgClass, NgForOf} from "@angular/common";

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
    NgClass
  ],
  templateUrl: './collections.component.html',
  styleUrl: './collections.component.css'
})
export class CollectionsComponent implements OnInit {
  posts: Post[] = [];
  filteredPosts: Post[] = [];
  currentPage = 1;
  totalPages = 1;
  selectedType = 'All';
  wasteTypes = ['Plastic', 'Paper', 'Glass', 'Metal', 'Electronics'];
  collectorCity: string = '';

  constructor(
      private collectionService: CollectionService,
      private authService: AuthService // Inject AuthService
  ) {}

  ngOnInit() {
    const collector = this.authService.getUser();
    this.collectorCity = collector.city;
    this.loadPosts();
  }

  loadPosts() {
    this.collectionService.getPendingPosts(this.collectorCity, this.currentPage).subscribe({
      next: ({ posts, total }) => {
        this.posts = posts;
        this.filteredPosts = this.filterPosts();
        this.totalPages = Math.ceil(total / 12);
      },
      error: (error) => console.error('Error loading posts:', error)
    });
  }

  filterByType(type: string) {
    this.selectedType = type;
    this.filteredPosts = this.filterPosts();
  }

  filterPosts(): Post[] {
    if (this.selectedType === 'All') {
      return this.posts;
    }
    return this.posts.filter(post =>
        post.wasteItems.some(item => item.type === this.selectedType)
    );
  }

  collectPost(postId: string) {
    const collectorId = this.authService.getUser().id;
    this.collectionService.collectPost(postId, collectorId).subscribe({
      next: () => {
        this.loadPosts();
      },
      error: (error) => console.error('Error collecting post:', error)
    });
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadPosts();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadPosts();
    }
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.loadPosts();
  }

  getPageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
}
