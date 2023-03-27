import { Component, ElementRef, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  auth_error: any = {}
  errorMessage: boolean | any
  signup_error: any = {}
  loginError: boolean = false
  signupErrorMsg: boolean = false
  signupSuccess: boolean = false


  constructor(private authservice: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.displaySignMsg()

  }

  login(form: { Loginemail: string, Loginpassword: string }) {
    this.authservice.login(form).subscribe({
      next: (loggedInresp) => {
        this.router.navigate(["/"])
      }, error: (error) => {
        this.loginError = true
        this.errorMsg()
      }
    })
  }

  errorMsg() {
    setTimeout(() => {
      this.loginError = false
      this.signupErrorMsg = false

    }, 4000);
  }

  displaySignMsg() {
    setTimeout(() => {
      this.signupSuccess = false
    }, 4000);
  }


  signUp(form: NgForm) {
    console.log(form.value.name);

    this.authservice.signup(form).subscribe({
      next: (data) => {
        this.signupSuccess = true
        this.signUpSuccess()
        form.reset()
      },
      error: (errorRep) => {
        this.signup_error = errorRep.error.errors
        console.log(this.signup_error)
        this.signupErrorMsg = true
        this.errorMsg()
      }
    })
  }
  // close event modal
  @ViewChild('closebutton') closeButton: ElementRef | any;
  triggerClick() {
    let el: HTMLElement = this.closeButton.nativeElement as HTMLElement;
    el.click();
  }

  // after a successfull sign up close modal
  signUpSuccess() {
    setTimeout(() => {
      this.signupSuccess = false
      this.triggerClick()
    }, 1000);

  }


}
