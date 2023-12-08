import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { Observable, of } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  private StorageKey = 'TodoDB';

  constructor() { }

  private getTodosFromLocalStorage() {
    const todosString = localStorage.getItem(this.StorageKey);
    return todosString ? JSON.parse(todosString) : [];
  }

  private setTodosToLocalStorage(todos: Todo[]): void {
    localStorage.setItem(this.StorageKey, JSON.stringify(todos));
  }

  // this function for get all todos 
  getTodos(): Observable<Todo[]> {
    return of(this.getTodosFromLocalStorage());
  }

  //this function for get single todo by is id
  getoneTodo(id: number) {
    const todos = this.getTodosFromLocalStorage();
    const todo = todos.find((t: Todo) => t.id === id);
    return of(todo)
  }

  //this function for add todo in localstorage
  addTodo(todo: Todo) {
    const todos = this.getTodosFromLocalStorage();
    todos.push(todo);
    this.setTodosToLocalStorage(todos);
  }

  //this function is used for update todo by is id
  updateTodoKey(id: number, newKey: string, title: string, disc: string, auser: User) {
    const todos = this.getTodosFromLocalStorage();
    const index = todos.findIndex((todo: { id: number; }) => todo.id === id);

    if (index !== -1) {
      todos[index].key = newKey;
      todos[index].title = title
      todos[index].discription = disc
      todos[index].assigneduser = auser

      this.setTodosToLocalStorage(todos);
    }

  }

  //this function is use for delete todo using is id
  deleteTodo(id: number) {
    const todos = this.getTodosFromLocalStorage();
    const updatedTodos = todos.filter((todo: { id: number; }) => todo.id !== id);
    this.setTodosToLocalStorage(updatedTodos);
  }
}
