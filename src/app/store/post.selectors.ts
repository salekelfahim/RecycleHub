import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PostState } from './post.state';

export const selectPostState = createFeatureSelector<PostState>('posts');

export const selectPosts = createSelector(
  selectPostState,
  (state: PostState) => state.posts
);

export const selectLoading = createSelector(
  selectPostState,
  (state: PostState) => state.loading
);

export const selectError = createSelector(
  selectPostState,
  (state: PostState) => state.error
);
