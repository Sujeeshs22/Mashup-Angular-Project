import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from './auth.service';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  loggedIn: boolean | undefined
  private declare userSub: Subscription
  userdetails: any
  constructor(private authservice: AuthService, private router: Router, private dataservice: DataService) { }


  ngOnInit(): void {
    this.authservice.autoLogin();
    this.userSub = this.authservice.user.subscribe((user) => {
      if (user === null) {
        this.loggedIn = false;
        this.authservice.userLoggedIn = this.loggedIn
      } else {
        this.loggedIn = true;
        this.authservice.userLoggedIn = this.loggedIn
        this.userdetails = JSON.parse(localStorage.getItem("user") || "{}")
      }
    });
  }


  logout() {
    this.authservice.logout()
    this.router.navigate(["/login"])
    this.userdetails.user = {}
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }



}


