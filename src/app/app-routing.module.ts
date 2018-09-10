import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// route components
import { LandingComponent } from './landing/landing.component';
import { FeedComponent } from './feed/feed.component';
import { ProfileComponent } from './profile/profile.component';


const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'feed', component: FeedComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
