import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopMenubarComponent } from './components/top-menubar/top-menubar.component';
import { SideMenubarComponent } from './components/side-menubar/side-menubar.component';
import { RouterModule } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { MenuModule } from 'primeng/menu';
import { InputTextModule } from 'primeng/inputtext';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { DialogModule } from 'primeng/dialog';
@NgModule({
  declarations: [
    TopMenubarComponent,
    SideMenubarComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
    BrowserAnimationsModule,
    MenubarModule,
    TieredMenuModule,
    MenuModule,
    InputTextModule,
    DialogModule
  ],
  exports: [
    TopMenubarComponent,
    SideMenubarComponent,

  ]
})
export class SharedModule { }
