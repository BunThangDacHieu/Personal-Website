import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './layouts/home/home.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { AboutComponent } from './layouts/about/about/about.component';
import { ContactComponent } from './layouts/contact/contact.component';
import { CategoryComponent } from './admin/category/category.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SignupComponent } from './layouts/signup/signup.component';
import { LoginComponent } from './layouts/login/login.component';

@NgModule({
  declarations: [ 
    AppComponent,
    HomeComponent,
    SignupComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    ContactComponent,
    CategoryComponent,
    LoginComponent  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule, 
    HttpClientModule  
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
