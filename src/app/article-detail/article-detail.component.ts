import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from "@angular/router";
import { Location } from "@angular/common";

import { User } from "../user";
import { Article } from "../article";
import { UserService } from "../user.service";
import { ArticleService } from "../article.service";

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {

  article: Article
  private users: User[]

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private userService: UserService,
    private location: Location,
    private router: Router
  ) { }

  ngOnInit() {
    // Send back not signed in users
    if (!this.userService.getCurrentUser()) {
      this.router.navigate(['/sign_in'])
    }
    // Send back if no article exists
    this.getArticle()
    this.getUserList()
  }

  getArticle(): void {
    const id = +this.route.snapshot.paramMap.get('id')
    this.articleService.getArticle(id)
      .then(article => this.article = article)
  }

  findAuthor(author_id: number): string {
    for(let num in this.users) {
      if(this.users[num].id === author_id) {
        return this.users[num].name
        // TODO: Cannot read property 'name' of null
        // Sign-in후 새로고침 하면 발생하는 현상
      }
    }
    return '#NaN'
  }

  goBack(): void {
    this.location.back()
  }

  getUserList(): void {
    this.userService.getUserList()
      .then(users => this.users = users)
  }

  confirm(): void {

  }
}
