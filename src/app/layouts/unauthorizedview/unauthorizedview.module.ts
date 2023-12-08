import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnauthorizedviewComponent } from './unauthorizedview.component';
import { LoginpageComponent } from '../../modules/loginpage/loginpage.component';
import { RegisterpageComponent } from '../../modules/registerpage/registerpage.component';
import { RouterModule } from '@angular/router';

import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from '@abacritt/angularx-social-login';

@NgModule({
  declarations: [
    UnauthorizedviewComponent,
    LoginpageComponent,
    RegisterpageComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  providers:[{
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
export class UnauthorizedviewModule { }
