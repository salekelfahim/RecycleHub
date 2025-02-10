import { Component, OnInit } from '@angular/core';
import { CollectionService } from '../../../services/collection.service';
import { AuthService } from '../../../services/auth.service';
import {NgClass, NgForOf} from "@angular/common";

export interface Post {
  id: string;
  wasteItems: { type: string; weight: number }[];
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
  selector: 'app-my-collections',
  standalone: true,
  imports: [
    NgClass,
    NgForOf
  ],
  templateUrl: './my-collections.component.html',
  styleUrl: './my-collections.component.css'
})
export class MyCollectionsComponent implements OnInit {
  collections: Post[] = [];
  currentPage = 1;
  totalPages = 1;
  limit = 8; // Items per page

  constructor(
      private collectionService: CollectionService,
      private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadCollections();
  }

  loadCollections() {
    const collectorId = this.authService.getUser().id;
    this.collectionService.getMyCollections(collectorId, this.currentPage, this.limit).subscribe({
      next: ({ posts, total }) => {
        this.collections = posts;
        this.totalPages = Math.ceil(total / this.limit);
      },
      error: (error) => console.error('Error loading collections:', error)
    });
  }


  changeStatus(postId: string, newStatus: string) {
    this.collectionService.updatePostStatus(postId, newStatus).subscribe({
      next: () => {
        // Refresh the collections list
        this.loadCollections();
      },
      error: (error) => console.error('Error updating status:', error)
    });
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadCollections();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadCollections();
    }
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.loadCollections();
  }

  getPageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  protected readonly Math = Math;
}
