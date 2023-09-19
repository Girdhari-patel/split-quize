import { Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { QuizService } from './../../services/quiz.service';
import { MatDialog } from '@angular/material/dialog';
import { QuizDialogComponent } from './../quiz-dialog/quiz-dialog.component';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent implements OnInit {
  finalQuizz: any = [];
  quizz: any = [];
  ques: any = [];
  chunks: any = [];
  input!: number;
  todos: any = [];

  constructor(
    private QuizService: QuizService,
    public dialog: MatDialog,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.QuizService.getquize().then((res) => {
      this.quizz = res;
    });
    console.log(this.quizz);
  }
/// image senitiazer
  getImgContent(image: any): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(image);
  }

  splitQuiz(ctrl: any) {
    this.input = Number(ctrl.value);
    let arr = this.ques;
    this.splitArrayIntoChunksOfLen(arr, this.input);
    this.todos = this.chunks;
  }

  splitArrayIntoChunksOfLen(arr: any, len: any) {
    this.chunks = [];
    var i = 0,
      n = arr.length;
    while (i < n) {
      this.chunks.push(arr.slice(i, (i += len)));
    }
    return this.chunks;
  }

  add(): any {
    return this.QuizService.addDoc(this.todos, this.quizz);
  }

  openDialog(e: any) {
    const dialogRef = this.dialog.open(QuizDialogComponent, {
      width: '100%',
      height: '100%',
      maxHeight: '750px',
      panelClass: 'personal-details-dialog',
      data: {
        quizId: e.quizId,
        quiz: e,
      },
    });
  }
}
