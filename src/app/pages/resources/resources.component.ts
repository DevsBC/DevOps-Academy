import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css']
})
export class ResourcesComponent implements OnInit {

  resources: any;
  constructor(private database: DatabaseService) { }

  ngOnInit(): void {
    this.database.getResources().subscribe((response: any) => {
      this.resources = response;
    });
  }

}
