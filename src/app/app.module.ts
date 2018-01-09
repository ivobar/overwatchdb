//Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AuthenticationModule } from './auth/auth.module';
import { AppRoutesModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Components
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { MyReplaysComponent } from './components/my-replays/my-replays.component';
import { AddReplayComponent } from './components/add-replay/add-replay.component';

//Services
import { AuthGuard } from './guards/auth.guard.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    MyReplaysComponent,
    AddReplayComponent
  ],
  imports: [
    BrowserModule,
    AuthenticationModule,
    AppRoutesModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
