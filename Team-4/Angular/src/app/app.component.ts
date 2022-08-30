import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { StudentService } from './student.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'student-management-crud';

  studentsArray = null;
  arrayLength: number = 0;
  deleteRollNum!:number;

  studentUpdate ={
    rollNumber: 0,
    name: "",
    address: "",
    marks: ""
  };
  public studentTable: boolean = false;

  constructor(private studentService: StudentService){
    this.getStudentsDetails();
  }

  register(registerForm: NgForm){
    this.studentService.registerStudent(registerForm.value).subscribe(
      (response: any) => {
        console.log(response);
        registerForm.reset();
        this.getStudentsDetails();
        this.studentTable = true;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  getStudentsDetails(){
    this.studentService.getStudents().subscribe(
      (response: any) => {
        console.log(response);
        this.studentsArray = response;
        this.arrayLength = response.length;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }



  delete(student: { rollNumber: number; name: string; address: string; marks: string; }){
    this.deleteRollNum = student.rollNumber;
  }

  deleteStudent(){
    this.studentService.deleteStudent(this.deleteRollNum).subscribe(
      (response: any) => {
        console.log(response);
        this.getStudentsDetails();
        console.log("Array length"+this.arrayLength);
        if(this.arrayLength == 1){
          this.studentTable = false;
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  update(student: { rollNumber: number; name: string; address: string; marks: string; }){
    this.studentUpdate = student;
  }

  updateStudent(){
    this.studentService.updateStudent(this.studentUpdate).subscribe(
      (response: any) => {
        console.log(response);
        this.getStudentsDetails();
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  



}
