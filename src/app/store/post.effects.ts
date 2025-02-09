import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { CollectionService } from '../services/collection.service';
import * as PostActions from './post.actions';

@Injectable()
export class PostEffects {
  constructor(
    private actions$: Actions,
    private collectionService: CollectionService
  ) {}

  loadPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActions.loadPosts),
      mergeMap(({ city, page }) =>
        this.collectionService.getPendingPosts(city, page).pipe(
          map(({ posts, total }) => PostActions.loadPostsSuccess({ posts, total })),
          catchError(error => of(PostActions.loadPostsFailure({ error: error.message })))
        )
      )
    )
  );

  collectPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActions.collectPost),
      mergeMap(({ postId, collectorId }) =>
        this.collectionService.collectPost(postId, collectorId).pipe(
          map(post => PostActions.collectPostSuccess({ post })),
          catchError(error => of(PostActions.collectPostFailure({ error: error.message })))
        )
      )
    )
  );
}
