import { Component, OnInit, AfterViewInit } from '@angular/core';
import { StudentsClient, StudentDto } from '../../../../../ClientServices/SchoolHubClientServices';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.css']
})
export class ViewStudentComponent implements OnInit, AfterViewInit {
  studentDto: StudentDto;
  studentId: number;

  constructor(private _studentService: StudentsClient,
    private _activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    this._activatedRoute.params.subscribe(params =>{
      this.studentId = params.id;
    })
  }

  ngAfterViewInit(){
    this.retrieveStudentById(this.studentId);
  }

public retrieveStudentById(studentId: number): void{
  this._studentService.retrieveStudentsById(studentId).subscribe((response:StudentDto) =>{
    this.studentDto = response;
  })
}

}
