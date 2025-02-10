import {Post} from "../services/collection.service";

export interface AppState {
  posts: PostState;
}

export interface PostState {
  posts: Post[];
  selectedPost: Post | null;
  loading: boolean;
  error: string | null;
}
