import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SingleCategoryComponent } from './pages/single-category/single-category.component';
import { SinglePostComponent } from './pages/single-post/single-post.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { TermAndConditionComponent } from './pages/term-and-condition/term-and-condition.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { CategoriesComponent } from './admin/categories/categories.component';
import { AllPostComponent } from './admin/post/all-post/all-post.component';
import { NewsPostComponent } from './admin/post/news-post/news-post.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  {path: 'signup', component: SignupComponent},
  {path: 'login', component: LoginComponent},

  //User
  {path: '', component: HomeComponent,},
  {path: 'category', component: SingleCategoryComponent},
  {path:  'post', component: SinglePostComponent},
  {path: 'about', component: AboutUsComponent},
  {path: 'contact', component: ContactUsComponent},
  {path: 'term', component: TermAndConditionComponent},
  //Admin
  {path: 'dashboard', component: DashboardComponent},
  {path: 'dashboard/categories', component: CategoriesComponent },
  {path: 'dashboard/post', component: AllPostComponent},
  {path: 'dashboard/post/new', component: NewsPostComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
