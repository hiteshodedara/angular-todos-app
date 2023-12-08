import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthorizedviewModule } from './layouts/authorizedview/authorizedview.module';
import { UnauthorizedviewModule } from './layouts/unauthorizedview/unauthorizedview.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';


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
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
