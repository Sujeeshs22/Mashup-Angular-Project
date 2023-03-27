import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { reduce, Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { DataService } from '../data.service';
import { QuestionsResponse } from '../model/questionresponse.model';
import { ListItem } from '../model/listitem.model';


@Component({
  selector: 'app-questionsanswered',
  templateUrl: './questionsanswered.component.html',
  styleUrls: ['./questionsanswered.component.css']
})
export class QuestionsansweredComponent implements OnInit, OnDestroy {
  questionList: ListItem[] = []
  declare userSub: Subscription
  loggedIn: boolean = false

  constructor(private authservice: AuthService, private router: Router, private dataservice: DataService) { }

  ngOnInit(): void {
    this.userSub = this.authservice.user.subscribe((user) => {
      if (user == null) {
        this.router.navigate(["/login"])
        this.loggedIn = false
      } else {
        this.loggedIn = true
      }
    })
    this.dataservice.myQuestionAnswer('https://forum.mashupstack.com/api/question/answered-by-me').subscribe({
      next: (response: QuestionsResponse) => {
        this.questionList = response.data
        //the array isstroed in the questuionlist not full response
      }, error: (error) => {
      }
    })
  }

  ngOnDestroy() {
    this.userSub.unsubscribe()
  }

}
