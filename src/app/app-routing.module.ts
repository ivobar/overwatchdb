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
import { MyReplaysComponent } from './components/my-replays/my-replays.component';
import { AddReplayComponent } from './components/add-replay/add-replay.component';
import { DeleteReplayComponent } from './components/delete-replay/delete-replay.component';
import { EditReplayComponent } from './components/edit-replay/edit-replay.component';

//Guards
import { AuthGuard } from './guards/auth.guard.service';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'register', component: RegisterFormComponent },
    { path: 'login', component: LoginFormComponent },
    { path: 'logout', component: LogoutComponent },
    { path: 'myprofile', canActivate: [AuthGuard], component: MyProfileComponent },
    { path: 'myreplays', canActivate: [AuthGuard], component: MyReplaysComponent },
    { path: 'addreplay', canActivate: [AuthGuard], component: AddReplayComponent },
    { path: 'replay/delete/:id', canActivate: [AuthGuard], component: DeleteReplayComponent },
    { path: 'replay/edit/:id', canActivate: [AuthGuard], component: EditReplayComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutesModule { };