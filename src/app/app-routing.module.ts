import { leadingComment } from '@angular/compiler';
import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { SignupComponent } from './components/signup/signup.component';
import { WorkbenchComponent } from './components/workbench/workbench.component';
import { LandingComponent } from './components/landing/landing.component';
import { RegisterStudentComponent } from './student/register-student/register-student.component';
import { StudentListComponent } from './student/student-list/student-list.component';

import {
  canActivate,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';
import { AngularFireAuthGuard } from '@angular/fire/compat/auth-guard';
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['workbench']);

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LandingComponent
  },
  {
    path: 'login',
    component: LoginComponent,
    ...canActivate(redirectLoggedInToHome),
  },
  {
    path: 'singup',
    component: SignupComponent,
    ...canActivate(redirectLoggedInToHome),
  },
  {
    path: 'workbench',
    component: WorkbenchComponent,
    ...canActivate(redirectUnauthorizedToLogin),

  },
  {
    path: 'quiz',
    component: QuizComponent,
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'workbench/register-student',
    component: RegisterStudentComponent,
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'student-list',
    component: StudentListComponent,
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: '**',
    redirectTo: ('/login')
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
