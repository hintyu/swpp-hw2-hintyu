import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { SignInComponent } from "./sign-in/sign-in.component";
import { ArticlesComponent } from "./articles/articles.component";
import { ArticleDetailComponent } from "./article-detail/article-detail.component";
import { ArticleCreateComponent } from "./article-create/article-create.component";

const routes: Routes = [

  { path: '', redirectTo: 'sign_in', pathMatch: 'full' },
  { path: 'sign_in', component: SignInComponent },
  { path: 'article', component: ArticlesComponent },
  { path: 'article/create', component: ArticleCreateComponent },
  { path: 'article/:id', component: ArticleDetailComponent },
  { path: '**', redirectTo: '/sign_in', pathMatch: 'full' }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
