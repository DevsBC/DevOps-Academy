import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTreeModule } from '@angular/material/tree';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSliderModule } from '@angular/material/slider';
import { MatBadgeModule } from '@angular/material/badge';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AccessComponent } from './pages/access/access.component';
import { HomeComponent } from './pages/home/home.component';
import { CmsLayoutComponent } from './layouts/cms-layout/cms-layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { DialogSignoutComponent } from './modals/dialog-signout/dialog-signout.component';
import { HeaderComponent } from './components/header/header.component';
import { EmployeesComponent } from './pages/employees/employees.component';
import { EmployeesTableComponent } from './tables/employees-table/employees-table.component';
import { JobnamePipe } from './pipes/jobname.pipe';
import { DialogEditEmployeeComponent } from './modals/dialog-edit-employee/dialog-edit-employee.component';
import { RolenamePipe } from './pipes/rolename.pipe';
import { SchedulesComponent } from './pages/schedules/schedules.component';
import { SchedulenamePipe } from './pipes/schedulename.pipe';
import { ScheduleperiodPipe } from './pipes/scheduleperiod.pipe';
import { CoursesComponent } from './pages/courses/courses.component';
import { ResourcesComponent } from './pages/resources/resources.component';
import { ResourcesTableComponent } from './tables/resources-table/resources-table.component';
import { DialogResourceComponent } from './modals/dialog-resource/dialog-resource.component';
import { CoursesTableComponent } from './tables/courses-table/courses-table.component';
import { StudentsComponent } from './pages/students/students.component';
import { MastersComponent } from './pages/masters/masters.component';

@NgModule({
  declarations: [
    AppComponent,
    AccessComponent,
    HomeComponent,
    CmsLayoutComponent,
    DialogSignoutComponent,
    HeaderComponent,
    EmployeesComponent,
    EmployeesTableComponent,
    JobnamePipe,
    DialogEditEmployeeComponent,
    RolenamePipe,
    SchedulesComponent,
    SchedulenamePipe,
    ScheduleperiodPipe,
    CoursesComponent,
    ResourcesComponent,
    ResourcesTableComponent,
    DialogResourceComponent,
    CoursesTableComponent,
    StudentsComponent,
    MastersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSlideToggleModule,
    MatTabsModule,
    MatTreeModule,
    MatDialogModule,
    MatSliderModule,
    MatBadgeModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatButtonToggleModule,
    MatProgressBarModule,
    MatCheckboxModule,
    MatRadioModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
