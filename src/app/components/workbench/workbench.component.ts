import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-workbench',
  templateUrl: './workbench.component.html',
  styleUrls: ['./workbench.component.css'],
})
export class WorkbenchComponent implements OnInit {
  opend = true;
  regesterStd: boolean = false;
  studentList: boolean = false;
  constructor(private router: Router) {}

  ngOnInit(): void {}
  switch(module: any) {
    if (module === `register-student`) {
      this.regesterStd = true;
      this.studentList = false;
    }
    if (module === `Student list`) {
      this.studentList = true;
      this.regesterStd = false;
    }

    console.log(module);
  }
}
