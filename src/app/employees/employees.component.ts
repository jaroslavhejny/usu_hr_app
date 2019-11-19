import {Component, OnInit} from '@angular/core';
import {Employee} from '../employee';
import {EmployeeService} from '../employee.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  private getEmployeesApi = '/employees';
  subscription: any;
  employees: Employee[];

  constructor(private employeeService: EmployeeService) {
  }

  getEmployees(): void {
    this.employeeService.getEmployees(this.getEmployeesApi)
      .subscribe(employees => this.employees = employees);
  }

  ngOnInit() {
    this.getEmployees();
    this.subscription = this.employeeService.getEmitter()
      .subscribe(item => {
        this.getEmployees();
      });
  }

}
