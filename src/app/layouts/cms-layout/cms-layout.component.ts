import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { DialogSignoutComponent } from '../../modals/dialog-signout/dialog-signout.component';

@Component({
  selector: 'app-cms-layout',
  templateUrl: './cms-layout.component.html',
  styleUrls: ['./cms-layout.component.css']
})
export class CmsLayoutComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );
  title = 'devops-academy';
  
  constructor(private breakpointObserver: BreakpointObserver, private dialog: MatDialog,
              private auth: AuthenticationService, private router: Router) {}

  ngOnInit(): void {
  }

  public dialogSignOut(): void {
    const dialogRef = this.dialog.open(DialogSignoutComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.auth.destroySession();
        this.router.navigateByUrl('/access');
      }
    });
  }

}
