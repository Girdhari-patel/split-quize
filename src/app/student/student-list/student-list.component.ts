import { Component, OnInit } from '@angular/core';
import{StudentService}from './../../services/student.service'
@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  constructor(private studentService:StudentService) { }
  Student:any=[];

  ngOnInit(): void {
    this.studentService.getStudentList().then((res) =>{
      this.Student= res;
    });
  }
  removeStudent(Student:any){
    if(confirm('Do you want to delete this record?' + Student.name))
    {
      this.studentService.deletStudent(Student)
      this.Student.splice(this.Student.findIndex((a:any)=>a.id==Student.id),1);
    }

  }
}
