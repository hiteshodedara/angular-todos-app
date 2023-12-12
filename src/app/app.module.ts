import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthorizedviewModule } from './layouts/authorizedview/authorizedview.module';
import { UnauthorizedviewModule } from './layouts/unauthorizedview/unauthorizedview.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { todolistReducer } from './Store/todolist/todolist.reducers';
import { TodolistEffect } from './Store/todolist/todolist.effects';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [

    BrowserModule,
    NgbModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AuthorizedviewModule,
    UnauthorizedviewModule,
    HttpClientModule,
    StoreModule.forRoot({todolist:todolistReducer}, {}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot([TodolistEffect]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
