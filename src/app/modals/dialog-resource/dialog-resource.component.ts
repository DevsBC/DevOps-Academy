import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dialog-resource',
  templateUrl: './dialog-resource.component.html',
  styleUrls: ['./dialog-resource.component.css']
})
export class DialogResourceComponent implements OnInit {

  resource: any = {};
  constructor(private database: DatabaseService, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  public async saveResource() {
    this.resource.unitsAvailable = this.resource.totalUnits;
    this.resource.resourceCode = 'RE' + Math.floor(100000 + Math.random() * 900000).toString();
    await this.database.createResource(this.resource);
    this.openSnackBar('El recurso se ha guardado');
    this.dialog.closeAll();
  }

  private openSnackBar(message: string): void {
    this.snackBar.open(message, 'OK', {
      duration: 2000,
    });
  }


}
