import { Component, OnInit } from '@angular/core';
import { Article } from "../article";
import { User } from "../user";
import { UserService } from "../user.service";

@Component({
  selector: 'app-article-create',
  templateUrl: './article-create.component.html',
  styleUrls: ['./article-create.component.css']
})
export class ArticleCreateComponent implements OnInit {

  public article: Article
  public currentUser: User

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.currentUser = this.userService.getCurrentUser()
    this.article = new Article()
  }

  getWritten(): void {
    this.article.title = document.forms["form"]["title"].value
    this.article.content = document.forms["form"]["content"].value
    alert("hi: " + this.article.title)
  }

  findAuthor(author_id: number){
    return this.userService.findAuthor(author_id)
  }
}
