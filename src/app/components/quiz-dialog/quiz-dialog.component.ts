import { Component, Inject, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
// import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import{QuizService}from './../../services/quiz.service'

@Component({
  selector: 'app-dialog1',
  templateUrl: './quiz-dialog.component.html',
  styleUrls: ['quiz-dialog.component.css']
})
export class QuizDialogComponent  implements OnInit {
  input!: number;
  quizz:any=[];
  ques:any = [];
  chunks:any = [];
  todos:any=[];
  
 

  constructor(private QuizService:QuizService, 
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<QuizDialogComponent>,
    
       @Inject(MAT_DIALOG_DATA) public data: any,
       ) { }

  ngOnInit(): void {
    this.QuizService.getquize().then((res) => {
      this.quizz = res;
    });
    

    this.QuizService.getqueston(this.data.quizId).then((res) => {
      this.ques = res;
    });
     
  
  }


  splitQuiz(ctrl:any){

    this.input= Number(ctrl.value)
    let arr=this.ques;
     if(this.input==0)
    {
      var message = "please enter more than 0 splices"
      this.snackBar.open(message, "", {
        duration: 5000,
      });  
      return 
    }
   
     this.splitArrayIntoChunksOfLen(arr,this.input);
     this.todos=this.chunks;  
  }

  splitArrayIntoChunksOfLen(arr:any,len:any) {
    this.chunks = [];
   
     var  i = 0, n = arr.length;
     while (i < n) {
      this.chunks.push(arr.slice(i, i += len));
     }
     return this.chunks;
   }

   drop(event: CdkDragDrop<string[]>) {

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } 
    else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      
    }
     console.log(this.todos);
  }

  add(): any {
    return this.QuizService.addDoc(this.todos, this.quizz);
  }

}
