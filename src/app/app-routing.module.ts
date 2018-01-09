import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Components to route
import { RegisterFormComponent } from './auth/components/register-form/register-form.component';
import { LoginFormComponent } from './auth/components/login-form/login-form.component';
import { LogoutComponent } from './auth/components/logout-component/logout.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { MyProfileComponent } from './auth/components/my-profile/my-profile.component';

//Guards
import { AuthGuard } from './guards/auth.guard.service';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'register', component: RegisterFormComponent },
    { path: 'login', component: LoginFormComponent },
    { path: 'logout', component: LogoutComponent },
    { path: 'myprofile', component: MyProfileComponent }
];

@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})
export class AppRoutesModule { };