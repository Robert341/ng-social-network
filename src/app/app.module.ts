// modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// components
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { HeaderComponent } from './header/header.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { MainComponent } from './main/main.component';
import { LoadingComponent } from './loading/loading.component';
import { ProfileComponent } from './profile/profile.component';

// services
import { HttpService } from './http.service';


@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    HeaderComponent,
    RegisterFormComponent,
    LoginFormComponent,
    MainComponent,
    LoadingComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
