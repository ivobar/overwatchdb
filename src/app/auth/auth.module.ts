import { NgModule } from '@angular/core';

import { authenticationComponents } from './index';

// Modules
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Services
import { AuthenticationService } from './auth.service';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { AuthGuard } from '../guards/auth.guard.service';

@NgModule({
  declarations: [
    ...authenticationComponents,
    MyProfileComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [
    ...authenticationComponents
  ],
  providers: [
    AuthenticationService,
    AuthGuard
  ]
})
export class AuthenticationModule { } 