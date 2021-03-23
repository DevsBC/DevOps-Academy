import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { MatExpansionPanel } from '@angular/material/expansion';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.css']
})
export class SchedulesComponent implements OnInit {

  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return {
          columns: 1,
          card: { cols: 1, rows: 1, rowHeight: "300px" },
        };
      }

      return {
        columns: 4,
        card: { cols: 2, rows: 2, rowHeight: "200px" },
      };
    })
  );

  schedule: any = {};
  schedules: any;
  task: any = {
    name: 'Indeterminate',
    completed: false,
    color: 'primary',
    subtasks: [
      { name: 'Salon 1A', completed: false },
      { name: 'Salon 1B', completed: false },
      { name: 'Salon 1C', completed: false },
      { name: 'Salon 2A', completed: false },
      { name: 'Salon 2B', completed: false },
      { name: 'Salon 2C', completed: false },
      { name: 'Salon de practicas', completed: false }

    ]
  };
  allComplete: boolean = false;

  constructor(private breakpointObserver: BreakpointObserver, private snackBar: MatSnackBar,
              private database: DatabaseService) { }

  ngOnInit(): void {
    this.database.getSchedules().subscribe((response: any) => {
      this.schedules = response;
    });
  }

  updateAllComplete() {
    this.allComplete = this.task.subtasks != null && this.task.subtasks.every((t: any) => t.completed);
  }

  someComplete(): boolean {
    if (this.task.subtasks == null) {
      return false;
    }
    return this.task.subtasks.filter((t: any) => t.completed).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.task.subtasks == null) {
      return;
    }
    this.task.subtasks.forEach((t: any) => t.completed = completed);
  }

  public async createSchedule(expansionPanel: MatExpansionPanel) {
    const rooms: any = [];
    this.task.subtasks.filter((t: any) => (t.completed) ? rooms.push(t.name): null);
    this.schedule.rooms = rooms;
    this.schedule.counter = 0;
    this.schedule.status = 'ACTIVE';
    switch (this.schedule.name) {
      case 'morning':
        this.schedule.schedule = '8:00 AM a 14:00 PM';
        break;
      case 'evening':
        this.schedule.schedule = '16:00 PM a 22:00 PM';
        break;
      case 'intensive':   
        this.schedule.schedule = '7:00 AM a 7:00 PM';
        break;
    }
    const newSchedule = { ...this.schedule };
    console.log(newSchedule);
    try {
      await this.database.createSchedule(newSchedule);

      this.schedule = {};
      for (const subtask of this.task.subtasks) {
        subtask.completed = false;
      }
      expansionPanel.close();
      this.openSnackBar('Se guardo el horario');
    } catch (error) {
      this.openSnackBar('Ocurrio un error');

    }
  }

  public deleteSchedule(schedule: any) {
    this.database.deleteSchedule(schedule);
  }

  public toggleSchedule(schedule: any) {
    if (schedule.status === 'ACTIVE') {
      schedule.status = 'INACTIVE';
    } else {
      schedule.status = 'ACTIVE';
    }
    this.database.updateScheduleStatus(schedule);
  }

  private openSnackBar(message: string): void {
    this.snackBar.open(message, 'OK', {
      duration: 2000,
    });
  }

}
