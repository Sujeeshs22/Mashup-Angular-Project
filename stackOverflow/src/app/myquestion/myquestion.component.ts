import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { DataService } from '../data.service';
import { ListItem } from '../model/listitem.model';
import { QuestionsResponse } from '../model/questionresponse.model';

@Component({
  selector: 'app-myquestion',
  templateUrl: './myquestion.component.html',
  styleUrls: ['./myquestion.component.css']
})
export class MyquestionComponent implements OnInit, OnDestroy {
  questionList: ListItem[] = []
  loggedIn: boolean = false
  declare userSub: Subscription;

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
    this.dataservice.myQuestion().subscribe((response: QuestionsResponse) => {
      this.questionList = response.data        //the array isstroed in the questuionlist not full response
    })
  }


  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}

