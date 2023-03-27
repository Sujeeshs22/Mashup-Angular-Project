import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { DataService } from '../data.service';
import { Question } from '../model/question.model';

@Component({
  selector: 'app-editquestion',
  templateUrl: './editquestion.component.html',
  styleUrls: ['./editquestion.component.css']
})
export class EditquestionComponent implements OnInit, OnDestroy {

  questiontitle: string = ""
  editquestion: string = ""
  loggedIn: boolean = false
  questionId: any
  editMsg: any
  alertuser: boolean = false

  declare private userSub: Subscription

  constructor(private route: ActivatedRoute, private authservice: AuthService, private dataservice: DataService, private router: Router) { }

  ngOnInit(): void {
    this.userSub = this.authservice.user.subscribe((user) => {
      if (user == null) {
        this.loggedIn = false
        this.router.navigate(["/login"])
      } else {
        this.loggedIn = true
      }
    })
    this.questionId = this.route.snapshot.params['id']
    this.dataservice.showQuestion(this.questionId).subscribe((question) => {
      this.questiontitle = question.title
      this.editquestion = question.question
    })

  }

  editQuestion(form: any, id: any) {
    this.alertuser = true
    this.editMsg = "question editted"
    this.dataservice.editQuestion(id, form.title, form.question).subscribe((response: any) => {
      this.router.navigate(['showquestion/' + this.questionId])
    })
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }


}
