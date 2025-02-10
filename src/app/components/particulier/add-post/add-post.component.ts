import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { AuthService } from "../../../services/auth.service";
import { Router } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { NgForOf } from "@angular/common";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-post',
  standalone: true,
  imports: [FormsModule, NgForOf],
  templateUrl: './add-post.component.html',
  styleUrl: './add-post.component.css'
})
export class AddPostComponent {
  post = {
    wasteItems: [] as { type: string, weight: number }[],
    wastePhotos: [] as string[],
    collectionAddress: '',
    city: '',
    collectionDate: '',
    timeSlot: '',
    additionalNotes: '',
    status: 'pending',
    userId: '',
    collectorId: ''
  };

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) {}

  private async fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  }

  async onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      try {
        const base64Promises = Array.from(input.files).map(file => this.fileToBase64(file));
        const base64Results = await Promise.all(base64Promises);

        this.post.wastePhotos = [...this.post.wastePhotos, ...base64Results];

      } catch (error) {
        console.error('Error converting files to base64:', error);
        Swal.fire({
          title: 'Error',
          text: 'Error processing images. Please try again.',
          icon: 'error'
        });
      }
    }
  }

  async onSubmit() {
    const user = this.authService.getUser();
    this.post.userId = user.id;

    try {
      const pendingPosts = await this.http.get<any[]>(`http://localhost:3000/posts?userId=${user.id}&status=pending`).toPromise();

      if (pendingPosts && pendingPosts.length >= 3) {
        Swal.fire({
          title: 'Limit Reached',
          text: 'You already have 3 pending posts. You cannot add another one.',
          icon: 'warning'
        });
        return;
      }
    } catch (error) {
      console.error('Error fetching pending posts:', error);
      Swal.fire({
        title: 'Error',
        text: 'Unable to verify your pending posts. Please try again later.',
        icon: 'error'
      });
      return;
    }

    const totalWeight = this.post.wasteItems.reduce((sum, item) => sum + item.weight, 0);
    if (totalWeight < 1000) {
      Swal.fire({
        title: 'Weight Limit',
        text: 'Total weight must be at least 1000g.',
        icon: 'warning'
      });
      return;
    }
    if (totalWeight > 10000) {
      Swal.fire({
        title: 'Weight Limit Exceeded',
        text: 'Total weight cannot exceed 10kg.',
        icon: 'warning'
      });
      return;
    }

    if (this.post.wastePhotos.length === 0) {
      Swal.fire({
        title: 'Photo Required',
        text: 'Please upload at least one photo of the waste.',
        icon: 'warning'
      });
      return;
    }

    this.http.post('http://localhost:3000/posts', this.post).subscribe(
      () => {
        Swal.fire({
          title: 'Post Created',
          text: 'Your recycling post has been created successfully!',
          icon: 'success'
        }).then(() => {
          this.router.navigate(['/particulier/posts']);
        });
      },
      (error) => {
        console.error('Error creating post:', error);
        Swal.fire({
          title: 'Error',
          text: 'There was an error creating your post. Please try again later.',
          icon: 'error'
        });
      }
    );
  }

  addWasteItem() {
    this.post.wasteItems.push({ type: '', weight: 1000 });
  }

  removeWasteItem(index: number) {
    this.post.wasteItems.splice(index, 1);
  }

  removePhoto(index: number) {
    this.post.wastePhotos.splice(index, 1);
  }
}
