import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { ArticleService } from "../article.service";
import { UserService } from "../user.service";

import { Article } from "../article";


@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  public articles: Article[]

  constructor(
    private articleService: ArticleService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    // Send back not signed in users
    if (!this.userService.getCurrentUser()) {
      this.router.navigate(['/sign_in'])
    }
    this.getArticleList()
  }

  getArticleList(): void {
    this.articleService.getArticleList()
      .then(articles => this.articles = articles)
  }

  signOut(): void {
    this.userService.signOut()
    this.router.navigate(['/sign_in'])
  }

  findAuthor(author_id: number): string {
    // findAuthor returns #NaN if no user found
    return this.userService.findAuthor(author_id)
  }

  createArticle(): void {
    this.router.navigate(['/create'])
  }

}
