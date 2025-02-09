import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../services/auth.service';
import {NgClass, NgForOf, NgIf} from "@angular/common";


interface WasteItem {
    type: string;
    weight: number;
}

interface Post {
    id: string;
    wasteItems: WasteItem[];
    wastePhotos: string[];
    status: string;
    collectionDate: string;
}

@Component({
    selector: 'app-my-posts',
    standalone: true,
    imports: [
        NgForOf,
        NgClass,
        NgIf
    ],
    templateUrl: './my-posts.component.html',
    styleUrl: './my-posts.component.css'
})
export class MyPostsComponent implements OnInit {
    posts: Post[] = [];

    constructor(private http: HttpClient, private authService: AuthService) {}

    ngOnInit() {
        const user = this.authService.getUser();
        this.http.get<Post[]>(`http://localhost:3000/posts?userId=${user.id}`).subscribe(
            (posts) => {
                this.posts = posts;
            },
            (error) => {
                console.error('Error fetching posts:', error);
                alert('Error fetching posts');
            }
        );
    }

    calculateTotalWeight(post: Post): number {
        return post.wasteItems.reduce((total, item) => total + item.weight, 0);
    }

    deletePost(postId: string, status: string) {
        if (status !== 'pending') {
            alert('You can only delete posts with status "pending".');
            return;
        }

        this.http.delete(`http://localhost:3000/posts/${postId}`).subscribe(
            () => {
                this.posts = this.posts.filter(post => post.id !== postId);
            },
            (error) => {
                console.error('Error deleting post:', error);
                alert('Error deleting post');
            }
        );
    }
}
