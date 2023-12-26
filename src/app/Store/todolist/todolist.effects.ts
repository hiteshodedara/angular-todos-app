import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { TodolistuiService } from "src/app/services/todolistui.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { LoadTodolists, LoadTodolistsFailure, LoadTodolistsSuccess, addTodolist, onArchiveTodolist, undoArchiveTodolist } from "./todolist.actions";
import { catchError, from, map, of, switchMap } from "rxjs";

@Injectable()
export class TodolistEffect {
  constructor(
    private todolistservice: TodolistuiService,
    private store: Store,
    private actions$: Actions
  ) { }

  loadTodolist$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoadTodolists),
      switchMap(() =>
        this.todolistservice.getAllTodolists().pipe(
          map((item) => LoadTodolistsSuccess({ todolist: item })),
          catchError((error) => of(LoadTodolistsFailure({ error })))
        )))
  )

  // Run this code when the addTodo or removeTodo action is dispatched
  saveTodos$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addTodolist),
        switchMap((action) => from(this.todolistservice.addTodolist(action.newtodolist)))
      ),
    // Most effects dispatch another action, but this one is just a "fire and forget" effect
    { dispatch: false }
  );

  setArchiveTodolist$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(onArchiveTodolist),
        switchMap((action) => from(this.todolistservice.settodolistArchive(action.aid)))
      ),
    // Most effects dispatch another action, but this one is just a "fire and forget" effect
    { dispatch: false }
  );

  undoArchiveTodolist$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(undoArchiveTodolist),
        switchMap((action) => from(this.todolistservice.undotodolistArchive(action.aid)))
      ),
    // Most effects dispatch another action, but this one is just a "fire and forget" effect
    { dispatch: false }
  );

  
}