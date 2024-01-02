import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnauthorizedviewComponent } from './layouts/unauthorizedview/unauthorizedview.component';
import { LoginpageComponent } from './modules/loginpage/loginpage.component';
import { RegisterpageComponent } from './modules/registerpage/registerpage.component';
import { AuthorizedviewComponent } from './layouts/authorizedview/authorizedview.component';
import { BoardshomeComponent } from './modules/boardshome/boardshome.component';
import { BoardsmembersComponent } from './modules/boardsmembers/boardsmembers.component';
import { TodosComponent } from './modules/todos/todos.component';
import { AccessGuard } from './guards/access.guard';
import { LoginPageGuard } from './guards/loginpageguard.guard';
import { BoardShowComponent } from './modules/board-show/board-show.component';

const routes: Routes = [
  { path: '', redirectTo: 'u', pathMatch: 'full' },//for redirecto login
  {
    path: 'u',
    component: UnauthorizedviewComponent,
    canActivate: [LoginPageGuard]
    , children: [
      { path: '', redirectTo: 'login', pathMatch: "full" },
      {
        path: 'login', component: LoginpageComponent
      },
      {
        path: 'register', component: RegisterpageComponent
      }
    ]
  },
  {
    path: 'a',
    component: AuthorizedviewComponent,
    canActivate: [AccessGuard],
    children: [
      { path: '', redirectTo: 'boardshome', pathMatch: 'full' },
      { path: 'boardshome', component: BoardshomeComponent },
      { path: 'boardsmembers', component: BoardsmembersComponent },
      {  path: 'board/:id', component: BoardShowComponent },
      { path: 'Todos', component: TodosComponent }
    ]
  }, {
    path: '**', redirectTo: 'u', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
