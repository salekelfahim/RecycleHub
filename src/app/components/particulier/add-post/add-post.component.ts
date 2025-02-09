import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { AuthService } from "../../../services/auth.service";
import { Router } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { NgForOf } from "@angular/common";

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
        alert('Error processing images. Please try again.');
      }
    }
  }

  onSubmit() {
    const user = this.authService.getUser();
    this.post.userId = user.id;

    const totalWeight = this.post.wasteItems.reduce((sum, item) => sum + item.weight, 0);
    if (totalWeight < 1000) {
      alert('Total weight must be at least 1000g.');
      return;
    }
    if (totalWeight > 10000) {
      alert('Total weight cannot exceed 10kg.');
      return;
    }

    if (this.post.wastePhotos.length === 0) {
      alert('Please upload at least one photo of the waste.');
      return;
    }

    this.http.post('http://localhost:3000/posts', this.post).subscribe(
        () => {
          alert('Post created successfully!');
          this.router.navigate(['/particulier/posts']);
        },
        (error) => {
          console.error('Error creating post:', error);
          alert('Error creating post');
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
