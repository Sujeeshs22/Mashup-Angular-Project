import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { DataService } from '../data.service';
import { Answer } from '../model/answer.model';

@Component({
  selector: 'app-editanswer',
  templateUrl: './editanswer.component.html',
  styleUrls: ['./editanswer.component.css']
})
export class EditanswerComponent implements OnInit {

  @Output() close = new EventEmitter();
  @Output() editCanceled = new EventEmitter();
  @Input() answerId: any
  @Input() answerValue: any

  constructor(private route: ActivatedRoute, private authservice: AuthService, private dataservice: DataService, private router: Router) { }

  ngOnInit(): void {
  }

  onEditAnswer(id: any, answer: any) {
    this.dataservice.editAnswer(id, answer).subscribe((resposne) => {
      this.close.emit()

    })
  }

  closeform() {
    this.editCanceled.emit()
  }


}
