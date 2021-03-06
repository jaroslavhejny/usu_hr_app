import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EmployeesComponent} from './employees/employees.component';
import {NewEmployeeComponent} from './new-employee/new-employee.component';
import {StatsComponent} from './stats/stats.component';

const routes: Routes = [
  { path: 'list', component: EmployeesComponent },
  { path: 'new-employee', component: NewEmployeeComponent },
  { path: 'stats', component: StatsComponent },
  { path: '', redirectTo: '/list', pathMatch: 'full' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
