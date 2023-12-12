import { createSelector } from "@ngrx/store";
import { TodolistState } from "./todolist.state";
import { AppState } from "../app.state";

export const selectTodolist=(state:AppState)=>state.todolist;

export const selectAllTodolist=createSelector(
    selectTodolist,
    (state:TodolistState)=>state.todolist
)