import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, tap } from 'rxjs';
import { User } from './model/User.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userLoggedIn: boolean | undefined

  user = new BehaviorSubject<any>(null);
  usertoken: string = ""

  constructor(private http: HttpClient, private router: Router) { }

  login(form: { Loginemail: string, Loginpassword: string }) {
    const headers = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded",
      "Accept": "application/json"
    })
    const body = new HttpParams().set('email', form.Loginemail).set('password', form.Loginpassword);
    return this.http.post("https://forum.mashupstack.com/api/login", body.toString(), {
      headers: headers,
    })
      .pipe(
        tap((event: any) => {
          //the user token is stored in the local storage
          const userLogged = event
          this.usertoken = userLogged.token

          localStorage.setItem("user", JSON.stringify(userLogged))
          this.user.next(userLogged)
        })
      )
  }


  signup(form: NgForm) {
    const headers = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded",
      "Accept": "application/json"
    })
    const body = new HttpParams().set('name', form.value.name).set('email', form.value.email).set('password', form.value.password).set('password_confirmation', form.value.password_confirmation)
    return this.http.post("https://forum.mashupstack.com/api/register", body.toString(), {
      headers: headers
    })
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('user');
  }

  autoLogin() {
    const token: any = localStorage.getItem('user')
    const userdet: User = JSON.parse(token);
    if (!userdet) {
      this.user.next(null);
      return;
    } else {
      this.user.next(userdet);
      return true;
    }
  }
}

