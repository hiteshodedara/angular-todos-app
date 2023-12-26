import { createAction, props } from "@ngrx/store";
import { Todoslist } from "src/app/models/todoslist";


export const addTodolist = createAction('[Todolist] Add Todolist', props<{ newtodolist: Todoslist }>())




export const onArchiveTodolist = createAction('[Todolist] Archive Todolist', props<{ aid: number }>())
export const undoArchiveTodolist = createAction('[Todolist] Undo Archive Todolist', props<{ aid: number }>())




export const LoadTodolists = createAction('[Todolist] Load Todolist')

export const LoadTodolistsSuccess = createAction('[Todolist] Load Todolist Successfully',
    props<{ todolist: Todoslist[] }>()
);

export const LoadTodolistsFailure = createAction('[Todolist] Load Todolist Failed',
    props<{ error: string }>()
);
