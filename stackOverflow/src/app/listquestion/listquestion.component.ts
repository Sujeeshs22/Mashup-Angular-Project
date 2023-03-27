import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { DataService } from '../data.service';
import { ListItem } from '../model/listitem.model';
import { Pipe } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-listquestion',
  templateUrl: './listquestion.component.html',
  styleUrls: ['./listquestion.component.css']
})
export class ListquestionComponent implements OnInit {
  // question passed from the home component
  @Input() declare question: ListItem
  @Output("liked") liked = new EventEmitter<any>();
  @Input() declare questionExist: boolean
  loggedIn: boolean | undefined
  // questionLiked: boolean | any = false
  declare userSub: Subscription;





  constructor(private authservice: AuthService, private dataservice: DataService, private router: Router) {
  }


  ngOnInit(): void {
    this.userSub = this.authservice.user.subscribe((user) => {
      if (user == null) {
        this.loggedIn = false
      } else {
        this.loggedIn = true
      }
    })
    // this.dataservice.listQuestions("https://forum.mashupstack.com/api/question")
  }


  likeQuestion(id: number) {
    const quesId: string = id.toString()
    this.dataservice.likeQuestion(quesId).subscribe({
      next: (response) => {
        this.liked.emit()
      },
      error: (error) => {
        this.liked.emit()

      }
    })

  }

  unlikeQuestion(id: any) {
    this.dataservice.UnlikeQuestion(id).subscribe({
      next: (response) => {
        this.liked.emit()
      },
      error: (error) => {
        this.liked.emit()
      }
    }
    )
  }

  // onLiked() {
  //   debugger
  //   if (this.questionLiked == true) {
  //     console.log("called")
  //   }
  // }


  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
