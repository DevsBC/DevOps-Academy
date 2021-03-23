import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-dialog-signout',
  templateUrl: './dialog-signout.component.html',
  styleUrls: ['./dialog-signout.component.css']
})
export class DialogSignoutComponent implements OnInit {

  constructor(public dialog: MatDialogRef<any>) { }

  ngOnInit(): void {
  }

  public signOut(): void {
    this.dialog.close(true);
  }

}
