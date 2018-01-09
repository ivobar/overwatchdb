//Modules
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
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
import { ReplayCardComponent } from './components/replay-card/replay-card.component';
import { DeleteReplayComponent } from './components/delete-replay/delete-replay.component';
import { EditReplayComponent } from './components/edit-replay/edit-replay.component';
import { HeroListComponent } from './components/hero-list/hero-list.component';


//Services
import { AuthGuard } from './guards/auth.guard.service';
import { ReplayService } from './services/replays.service';
import { HeroDetailsComponent } from './components/hero-details/hero-details.component';
import { MyStatsComponent } from './components/my-stats/my-stats.component';
import { HeroEditComponent } from './components/hero-edit/hero-edit.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    MyReplaysComponent,
    AddReplayComponent,
    ReplayCardComponent,
    DeleteReplayComponent,
    EditReplayComponent,
    HeroListComponent,
    HeroDetailsComponent,
    MyStatsComponent,
    HeroEditComponent
  ],
  imports: [
    BrowserModule,
    AuthenticationModule,
    AppRoutesModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthGuard,
    ReplayService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
