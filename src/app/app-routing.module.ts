import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AccessComponent } from './pages/access/access.component';
import { CmsLayoutComponent } from './layouts/cms-layout/cms-layout.component';
import { AuthGuard } from './guards/auth.guard';
import { EmployeesComponent } from './pages/employees/employees.component';
import { SchedulesComponent } from './pages/schedules/schedules.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { ResourcesComponent } from './pages/resources/resources.component';
import { MastersComponent } from './pages/masters/masters.component';
import { StudentsComponent } from './pages/students/students.component';

const routes: Routes = [
  {
    path: 'cms',
    component: CmsLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'masters', component: MastersComponent },
      { path: 'students', component: StudentsComponent },
      { path: 'schedules', component: SchedulesComponent },
      { path: 'employees', component: EmployeesComponent },
      { path: 'courses', component: CoursesComponent },
      { path: 'resources', component: ResourcesComponent }
    ]
  },
  { path: 'access', component: AccessComponent },
  { path: '**', redirectTo: 'cms/home', pathMatch: 'full' },
  { path: '', redirectTo: 'cms/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
