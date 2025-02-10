import { createAction, props } from '@ngrx/store';
import {Post} from "../services/collection.service";

export const loadPosts = createAction('[Post] Load Posts', props<{ city: string, page: number }>());
export const loadPostsSuccess = createAction('[Post] Load Posts Success', props<{ posts: Post[], total: number }>());
export const loadPostsFailure = createAction('[Post] Load Posts Failure', props<{ error: string }>());

export const collectPost = createAction('[Post] Collect Post', props<{ postId: string, collectorId: string }>());
export const collectPostSuccess = createAction('[Post] Collect Post Success', props<{ post: Post }>());
export const collectPostFailure = createAction('[Post] Collect Post Failure', props<{ error: string }>());
