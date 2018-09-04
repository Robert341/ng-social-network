import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// route components
import { LandingComponent } from './landing/landing.component';
import { MainComponent } from './main/main.component';
import { ProfileComponent } from './profile/profile.component';


const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'main', component: MainComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
