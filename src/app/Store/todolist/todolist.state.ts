import { Todoslist } from "src/app/models/todoslist";

export interface TodolistState {
    todolist: Todoslist[],
    error: string,
    status: 'pending' | 'loading' | 'error' | 'success';
}

export const TodolistinitialState: TodolistState = {
    todolist: [],
    error: '',
    status: 'pending'
}