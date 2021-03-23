import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DatabaseService } from '../../services/database.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dialog-edit-employee',
  templateUrl: './dialog-edit-employee.component.html',
  styleUrls: ['./dialog-edit-employee.component.css']
})
export class DialogEditEmployeeComponent implements OnInit {

  employee: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private database: DatabaseService,
              private snackBar: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.employee = this.data.employee;
  }

  public async saveUser() {
    try {
      await this.database.saveUser(this.employee);
      this.openSnackBar('Informacion actualizada');
      this.dialog.closeAll();
    } catch (error) {
      console.log(error);
    }
  }

  private openSnackBar(message: string): void {
    this.snackBar.open(message, 'OK', {
      duration: 2000,
    });
  }

}
