import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  @ViewChild(MatAccordion) accordion: MatAccordion | undefined;
  students: any;

  constructor(private database: DatabaseService) { }

  ngOnInit(): void {
    this.database.getStudents().then((students) => this.students = students);
  }

}
