import {Component, OnInit} from '@angular/core';
import {EmployeeService} from '../employee.service';

@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrls: ['./new-employee.component.css']
})
export class NewEmployeeComponent implements OnInit {
  name: string;
  age: number;
  position: string;
  response: any;

  private createEmployeeApi = '/employees';
  private AvailPosition = ['CEO', 'SCRUM_MASTER', 'FRONTEND_DEVELOPER', 'BACKEND_DEVELOPER', 'PRODUCT_OWNER'];

  get hasName() {
    return this.name && this.name.length;
  }

  get hasAge() {
    return this.age > 0 && this.age < 151;
  }

  get canSend() {
    return this.hasName && this.hasAge;
  }

  get newUser() {
    return {
      age: this.age,
      id: 0,
      name: this.name,
      position: this.position
    };
  }

  constructor(private employeeService: EmployeeService) {
    this.position = this.AvailPosition[0];
  }

  createNew(): void {
    this.employeeService.createEmployee(this.createEmployeeApi, this.newUser)
      .subscribe((response) => {
        this.response = response;
        this.age = undefined;
        this.name = null;
      });
  }
  ngOnInit() {
  }

}
