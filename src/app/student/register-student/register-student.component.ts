import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-register-student',
  templateUrl: './register-student.component.html',
  styleUrls: ['./register-student.component.css']
})
export class RegisterStudentComponent implements OnInit {
  file: any={};
  image:any;
  
  constructor(private StudentService:StudentService, private router:Router) { }

  submitForm = new FormGroup({
    Name:new FormControl(''),
    dob :new FormControl(''),
    Email : new FormControl(''),
    mobile : new FormControl(''),
    image: new FormControl('')
 });


  ngOnInit(): void {
  }
 

  onSubmit( ){
     

  confirm('Data has been submitted')
    console.log(this.submitForm.value);
    this.StudentService.createStudent(this.submitForm.value).then((res) => {
      console.log(res);
    });
  

  this.router.navigate(['/student-list']);

}

}

 
