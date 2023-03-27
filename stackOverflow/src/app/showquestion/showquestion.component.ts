import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { DataService } from '../data.service';
import { Question } from '../model/question.model';
import { Answer } from '../model/answer.model';
import { User } from '../model/User.model';
import { ListItem } from '../model/listitem.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-showquestion',
  templateUrl: './showquestion.component.html',
  styleUrls: ['./showquestion.component.css']
})
export class ShowquestionComponent implements OnInit, OnDestroy {

  questionId: any
  declare theQuestions: Question
  loggedIn: boolean = false
  responseAnswer: any
  // if no answer display message
  showanswer: boolean = false
  answerArrLength: Answer[] = []
  declare userDetails: any
  declare userSub: Subscription;
  answerId: any
  editAnswer: boolean = false
  answerValue: string = ''
  answerSavedMsg: boolean = false





  constructor(private route: ActivatedRoute, private authservice: AuthService, private dataservice: DataService, private router: Router) { }
  ngOnInit() {
    this.userSub = this.authservice.user.subscribe((user) => {
      if (user == null) {
        // this.router.navigate(["/login"])
        this.loggedIn = false
        // this.showanswer = false
      } else {
        this.loggedIn = true
        this.userDetails = user.user
      }
    })
    this.questionId = this.route.snapshot.params['id'];
    this.showQuestion(this.questionId)
    // this.userDetails = JSON.parse(localStorage.getItem('user') || '{}');
    // if (this.authservice.userLoggedIn == false || this.authservice.userLoggedIn == undefined) {
    //   this.router.navigate(["/login"])
    // }

  }

  showQuestion(questionId: any) {
    this.dataservice.showQuestion(questionId).subscribe((response: any) => {
      this.theQuestions = response
      this.responseAnswer = response.user
      this.answerArrLength = response.answers
      if (response.answers.length >= 1) {
        this.showanswer = true
      } else {
        this.showanswer = false
      }
    })
  }

  submitAnswer(userAnswer: any, Id: number) {
    this.dataservice.submitAnswer(userAnswer.answer, Id).subscribe((response: any) => {
      alert("Answer saved")
      this.showQuestion(Id)
    })
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  deleteQuestion(id: any) {
    this.dataservice.deleteQuestion(id).subscribe((response) => {
      alert("quesiton deleted")
      this.router.navigate(["/myquestion"])
    })
  }

  deleteAnswer(id: any) {
    this.dataservice.deleteAnswer(id).subscribe((deleted) => {
      alert("answer deleted")
      this.ngOnInit()
    })
  }

  onEditForm(id: any, answer: any) {
    this.answerId = id
    this.editAnswer = true
    this.answerValue = answer

  }

  closeEditForm() {
    this.editAnswer = false
    this.answerSavedMsg = true
    this.ngOnInit()
    this.showAnswerSaved()
  }

  editCanceled() {
    this.editAnswer = false
    this.ngOnInit()
    this.showAnswerSaved()
  }

  showAnswerSaved() {
    setTimeout(() => {
      this.answerSavedMsg = false
    }, 3000);
  }
}

