import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take, exhaustMap, tap, map } from 'rxjs';
import { AuthService } from './auth.service';
import { ListItem } from './model/listitem.model';
import { Question } from './model/question.model';
import { QuestionsResponse } from './model/questionresponse.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private authservice: AuthService, private http: HttpClient) { }

  headers = new HttpHeaders({
    "Content- Type": 'application/x-www-form-urlencoded',
    Accept: 'application/json',
  });

  askQuestion(title: string, question: string) {
    let token: any
    this.authservice.usertoken = token
    return this.authservice.user.pipe(
      take(1),
      exhaustMap((user) => {
        console.log(token)
        const headers = new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
          Authorization: 'Bearer ' + user.token,
        });
        const body = new HttpParams()
          .set('title', title)
          .set('question', question);
        return this.http.post(
          'https://forum.mashupstack.com/api/question',
          body,
          {
            headers: headers,
          }
        );
      })
    );
  }

  listQuestions(url: any) {
    return this.http.get<QuestionsResponse>(url)
  }


  likeQuestion(id: any) {
    return this.authservice.user.pipe(
      take(1),
      exhaustMap((user) => {
        const headers = new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
          Authorization: 'Bearer ' + user.token,
        });
        return this.http.post<any>(
          "https://forum.mashupstack.com/api/question/" + id + "/like",
          { headers: headers }
        ).pipe(
          tap((event: any) => {
            console.log(event, "vent called")
          }))
      })
    );
  }


  UnlikeQuestion(id: number) {
    return this.authservice.user.pipe(
      take(1),
      exhaustMap((user) => {
        const headers = new HttpHeaders({
          "Content- Type": 'application/x-www-form-urlencoded',
          Accept: 'application/json',
          Authorization: 'Bearer ' + user.token,
        });
        return this.http.post<any>(
          'https://forum.mashupstack.com/api/question/' + id + '/remove-like',
          { headers: headers }
        );
      })
    );
  }

  // get question using id
  showQuestion(id: any) {
    return this.http.get<Question>(
      'https://forum.mashupstack.com/api/question/' + id
    )
  }

  getQuestionAnswer(id: any) {
    return this.http.get<any>(
      'https://forum.mashupstack.com/api/question/' + id
    )
  }

  submitAnswer(answer: any, id: number) {
    return this.authservice.user.pipe(
      take(1),
      exhaustMap((user) => {
        console.log(user.token)
        const headers = new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
          Authorization: 'Bearer ' + user.token,
        });
        const body = new HttpParams().set("answer", answer);
        return this.http.post<any>(
          'https://forum.mashupstack.com/api/question/' + id + '/answer', body,
          { headers: headers }
        );
      })
    );
  }

  searchForm(searchValue: any) {
    console.log(searchValue)
    const body = new HttpParams().set("keyword", searchValue);
    return this.http.get<any>("https://forum.mashupstack.com/api/question/search?" + body
    ).pipe(
      map((response: any) => {
        let questions: any = response;
        console.log(questions);
        return questions;
      })
    );
  }

  // users answer
  myQuestionAnswer(url: string) {
    return this.authservice.user.pipe(
      take(1),
      exhaustMap((user) => {
        console.log(user.token)
        const headers = new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
          Authorization: 'Bearer ' + user.token,
        });
        return this.http.get<any>(
          url,
          { headers: headers }
        ).pipe(map(
          (response: any) => {
            const questions: any = response.questions
            return questions
          }
        ))
      })
    );
  }

  // user asked question
  myQuestion() {
    return this.authservice.user.pipe(
      take(1),
      exhaustMap((user) => {
        console.log(user.token)
        const headers = new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
          Authorization: 'Bearer ' + user.token,
        });
        return this.http.get<any>(
          "https://forum.mashupstack.com/api/question/my-questions",
          { headers: headers }
        ).pipe(map(
          (response: any) => {
            const questions: any = response.questions
            return questions
          }
        ))
      })
    );
  }

  editQuestion(id: any, title: any, question: any) {
    return this.authservice.user.pipe(
      take(1),
      exhaustMap((user) => {
        console.log(user.token)
        const headers = new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
          Authorization: 'Bearer ' + user.token,
        });
        const body = new HttpParams().set("title", title).set("question", question)
        return this.http.put<any>(
          "https://forum.mashupstack.com/api/question/" + id, body,
          { headers: headers }
        )
      })
    );
  }

  deleteQuestion(id: any) {
    return this.authservice.user.pipe(
      take(1),
      exhaustMap((user) => {
        console.log(user.token)
        const headers = new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
          Authorization: 'Bearer ' + user.token,
        });
        return this.http.delete<any>(
          "https://forum.mashupstack.com/api/question/" + id,
          { headers: headers }
        )
      })
    );
  }


  deleteAnswer(id: any) {
    return this.authservice.user.pipe(
      take(1),
      exhaustMap((user) => {
        console.log(user.token)
        const headers = new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
          Authorization: 'Bearer ' + user.token,
        });
        return this.http.delete<any>(
          "https://forum.mashupstack.com/api/answer/" + id,
          { headers: headers }
        )
      })
    );
  }

  editAnswer(id: any, answer: string) {
    return this.authservice.user.pipe(
      take(1),
      exhaustMap((user) => {
        console.log(user.token)
        const headers = new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
          Authorization: 'Bearer ' + user.token,
        });
        const body = new HttpParams().set("answer", answer)
        return this.http.put<any>(
          "https://forum.mashupstack.com/api/answer/" + id, body,
          { headers: headers }
        )
      })
    );
  }
}

