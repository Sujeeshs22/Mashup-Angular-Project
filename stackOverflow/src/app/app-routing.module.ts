import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AskquestionComponent } from './askquestion/askquestion.component';
import { AuthComponent } from './auth/auth.component';
import { EditquestionComponent } from './editquestion/editquestion.component';
import { HomeComponent } from './home/home.component';
import { MyquestionComponent } from './myquestion/myquestion.component';
import { QuestionsansweredComponent } from './questionsanswered/questionsanswered.component';
import { ShowquestionComponent } from './showquestion/showquestion.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "login", component: AuthComponent },
  { path: "askQuestion", component: AskquestionComponent },
  { path: "showquestion/:id", component: ShowquestionComponent },
  { path: "myquestions-answer", component: QuestionsansweredComponent },
  {
    path: "myquestion", component: MyquestionComponent
  },
  { path: "editQuestion/:id", component: EditquestionComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
