import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { DataService } from '../data.service';
import { QuestionsResponse } from '../model/questionresponse.model';

@Component({
  selector: 'app-pagintaion',
  templateUrl: './pagintaion.component.html',
  styleUrls: ['./pagintaion.component.css']
})
export class PagintaionComponent implements OnInit {

  @Input() declare pages: QuestionsResponse
  @Output() pageNum = new EventEmitter()
  @Input() declare currentPageNum: any

  constructor(private authservice: AuthService, private router: Router, private dataservice: DataService) { }

  ngOnInit(): void {
    
  }

  generateArray(n: number): number[] {
    return [...Array(n).keys()];
  }


  onNextPage(pagenum: number) {
    this.pageNum.emit(pagenum)

  }

  // changePage(){

  // }
}
