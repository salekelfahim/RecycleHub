import { createReducer, on } from '@ngrx/store';
import { PostState } from './post.state';
import * as PostActions from './post.actions';

export const initialState: PostState = {
  posts: [],
  selectedPost: null,
  loading: false,
  error: null
};

export const postReducer = createReducer(
  initialState,
  on(PostActions.loadPosts, state => ({ ...state, loading: true })),
  on(PostActions.loadPostsSuccess, (state, { posts }) => ({ ...state, posts, loading: false })),
  on(PostActions.loadPostsFailure, (state, { error }) => ({ ...state, error, loading: false })),
  on(PostActions.collectPost, state => ({ ...state, loading: true })),
  on(PostActions.collectPostSuccess, (state, { post }) => ({
    ...state,
    posts: state.posts.filter(p => p.id !== post.id),
    loading: false
  })),
  on(PostActions.collectPostFailure, (state, { error }) => ({ ...state, error, loading: false }))
);
