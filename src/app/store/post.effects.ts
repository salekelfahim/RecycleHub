import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { CollectionService } from '../services/collection.service';
import { UserService } from '../services/user.service';
import * as PostActions from './post.actions';

@Injectable()
export class PostEffects {
  constructor(
    private actions$: Actions,
    private collectionService: CollectionService,
    private userService: UserService
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
          switchMap(post => {
            if (!post.userId) {
              console.error("post.userId is undefined");
              return of(PostActions.collectPostFailure({ error: "User ID is missing" }));
            }

            let totalPoints = 0;
            post.wasteItems.forEach(item => {
              const weightKg = item.weight / 1000;
              switch (item.type) {
                case 'plastic':
                  totalPoints += weightKg * 2;
                  break;
                case 'glass':
                  totalPoints += weightKg * 1;
                  break;
                case 'paper':
                  totalPoints += weightKg * 1;
                  break;
                case 'metal':
                  totalPoints += weightKg * 5;
                  break;
              }
            });

            console.log(`Updating points for user ${post.userId}: ${totalPoints} points`);

            return this.userService.updateUserPoints(Number(post.userId), totalPoints).pipe(
              map(() => {
                console.log(`User ${post.userId} points updated successfully`);
                return PostActions.collectPostSuccess({ post });
              }),
              catchError(error => {
                console.error("Error updating user points:", error);
                return of(PostActions.collectPostFailure({ error: error.message }));
              })
            );
          }),
          catchError(error => {
            console.error("Error collecting post:", error);
            return of(PostActions.collectPostFailure({ error: error.message }));
          })
        )
      )
    )
  );


}
