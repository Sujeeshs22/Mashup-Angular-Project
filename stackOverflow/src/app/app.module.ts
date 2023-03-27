import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthComponent } from './auth/auth.component';
import { PagintaionComponent } from './pagintaion/pagintaion.component';
import { HomeComponent } from './home/home.component';
import { AskquestionComponent } from './askquestion/askquestion.component';
import { ListquestionComponent } from './listquestion/listquestion.component';
import { ShowquestionComponent } from './showquestion/showquestion.component';
import { QuestionsansweredComponent } from './questionsanswered/questionsanswered.component';
import { MyquestionComponent } from './myquestion/myquestion.component';
import { EditquestionComponent } from './editquestion/editquestion.component';
import { EditanswerComponent } from './editanswer/editanswer.component';
import { ShortenPipe } from './shorten.pipe';


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    PagintaionComponent,
    HomeComponent,
    AskquestionComponent,
    ListquestionComponent,
    ShowquestionComponent,
    QuestionsansweredComponent,
    MyquestionComponent,
    EditquestionComponent,
    EditanswerComponent,
    ShortenPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, FormsModule, HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
