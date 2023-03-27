import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-askquestion',
  templateUrl: './askquestion.component.html',
  styleUrls: ['./askquestion.component.css']
})
export class AskquestionComponent implements OnInit, OnDestroy {

  questionMessage: string | undefined
  declare userSub: Subscription
  loggedIn: boolean = false

  constructor(private authservice: AuthService, private router: Router, private dataservice: DataService) { }

  ngOnInit(): void {
    this.userSub = this.authservice.user.subscribe((user) => {
      if (user == null) {
        this.loggedIn = false
        this.router.navigate(["/login"])
      } else {
        this.loggedIn = true
      }
    })
  }

  askQuestion(question: any) {
    this.questionMessage = undefined
    this.dataservice.askQuestion(question.title, question.question).subscribe({
      next: (response: any) => {
        this.questionMessage = response.message
        this.router.navigate(["/"])
      },
      error: (error) => {
      }
    })
  }

  ngOnDestroy() {
    this.userSub.unsubscribe()
  }

}
