import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { UserService } from "../user.service";
import { SignInService } from "../sign-in.service";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(
    private userService: UserService,
    private signInService: SignInService,
    private router: Router
  ) {}

  ngOnInit() {
    let currentUser = this.userService.getCurrentUser()
    if(currentUser){
      currentUser.signed_in = false
      this.userService.updateUser(currentUser)
    }
  }

  test(){
    let hello: string = "hi"
    hello= this.userService.getCurrentUser().name
    return hello
  }

  signIn() {
    let email: string = document.forms["form"]["email"].value
    let password: string = document.forms["form"]["password"].value

    // userService's signIn method tries to sign-in with given email, password.
    // if it fails, it returns false. otherwise, it UPDATES user status inside the userService & http
    if (this.signInService.signIn(email, password)){
      this.router.navigate(['/article'])

    } else alert('Email or password is wrong')

    return
  }
}

