import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { DataService } from '../data.service';
import { ListItem } from '../model/listitem.model';
import { QuestionsResponse } from '../model/questionresponse.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit, OnDestroy {

  questionList: ListItem[] = []
  declare QuestionPages: any
  userSub: any;
  questionExist: boolean = true
  declare currentPage: any

  // page number from pagination
  declare pageNumber: number

  constructor(private authservice: AuthService, private router: Router, private dataservice: DataService) {
  }

  homeloggedIn: boolean | any

  ngOnInit(): void {
    this.authservice.autoLogin();
    this.userSub = this.authservice.user.subscribe((user) => {
      if (user === null) {
        this.homeloggedIn = false;
      } else {
        this.homeloggedIn = true;
      }
    });
    this.dataservice.listQuestions("https://forum.mashupstack.com/api/question").subscribe((response) => {
      this.questionList = response.data
      this.QuestionPages = response
      let page = response.current_page
      this.currentPage = parseInt(page)
      this.pageNumber = this.currentPage
      if (this.questionList.length < 1) {
        this.questionExist = false
      } else {
        this.questionExist = true
      }

    })
  }


  searchForm(search: any) {
    this.dataservice.searchForm(search.search).subscribe(
      (response: QuestionsResponse) => {
        this.questionList = response.data
        if (this.questionList.length < 1) {
          this.ngOnInit()
          this.questionExist = false
        } else {
          this.questionExist = true
        }
      }
    )
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }


  onLiked() {
    return this.paginatePage(this.pageNumber)
  }


  paginatePage(pageNum: number) {
    this.pageNumber = pageNum
    console.log(pageNum)
    this.dataservice.listQuestions("https://forum.mashupstack.com/api/question?page=" + pageNum).subscribe((response) => {
      this.questionList = response.data
      let page = response.current_page
      this.currentPage = parseInt(page)
    })
  }
}
