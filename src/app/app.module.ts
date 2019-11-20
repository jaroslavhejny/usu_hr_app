import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { AppRoutingModule } from './app-routing.module';
import { NewEmployeeComponent } from './new-employee/new-employee.component';
import { FormsModule } from '@angular/forms';
import { MessagesComponent } from './messages/messages.component';
import { StatsComponent } from './stats/stats.component';


@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    EmployeeDetailComponent,
    NewEmployeeComponent,
    MessagesComponent,
    StatsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
