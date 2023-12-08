import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorizedviewComponent } from './authorizedview.component';
import { TodosComponent } from '../../modules/todos/todos.component';
import { TodolistsComponent } from '../../modules/todolists/todolists.component';
import { TodoitemsComponent } from '../../modules/todoitems/todoitems.component';
import { TodoPopupModelComponent } from '../../modules/todo-popup-model/todo-popup-model.component';
import { BoardshomeComponent } from '../../modules/boardshome/boardshome.component';
import { BoardsmembersComponent } from '../../modules/boardsmembers/boardsmembers.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { TooltipModule } from 'primeng/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { MenubarModule } from 'primeng/menubar';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmPopupModule } from 'primeng/confirmpopup'
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from '@abacritt/angularx-social-login';


@NgModule({
  declarations: [

    AuthorizedviewComponent,
    TodosComponent,
    TodolistsComponent,
    TodoitemsComponent,
    TodoPopupModelComponent,
    BoardshomeComponent,
    BoardsmembersComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    RouterModule,
    SharedModule,
    TooltipModule,
    MenubarModule,
    DynamicDialogModule,
    DialogModule,
    ToastModule,
    ConfirmPopupModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    MenuModule,
    TieredMenuModule

  ], providers: [{
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(
            '327766667052-u8c60mi5qmvtcu0gn5g43vaftleffphj.apps.googleusercontent.com'
          )
        },
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider('1088964562458240')
        }
      ],
      onError: (err: any) => {
        console.error(err);
      }
    } as SocialAuthServiceConfig,
  }]
})
export class AuthorizedviewModule { }
