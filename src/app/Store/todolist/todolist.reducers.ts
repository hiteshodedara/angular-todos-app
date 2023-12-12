import { createReducer, on, props } from "@ngrx/store";
import { TodolistinitialState } from "./todolist.state";
import { LoadTodolists, LoadTodolistsFailure, LoadTodolistsSuccess, addTodolist, onArchiveTodolist } from "./todolist.actions";



export const todolistReducer=createReducer(
    TodolistinitialState,
    on(addTodolist,(state,props)=>({
        ...state,
        todolist:[...state.todolist,props.newtodolist]
    })),
    on(onArchiveTodolist,(state,props)=>({
        ...state,
        todolist:state.todolist.filter((item)=>item.id!=props.aid)
    })),
    on(LoadTodolists,(state)=>({
        ...state,
        status: "loading" as any
        // 'loading' 
    })),
    on(LoadTodolistsSuccess,(state,{todolist})=>({
        ...state,
        todolist:todolist,
        error:'',
        status:'success' as any
    })),
    on(LoadTodolistsFailure,(state,{error})=>({
        ...state,
        error:error,
        status:'error' as any
    }))
)