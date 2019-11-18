import { Component, Input, OnInit } from '@angular/core';
import {Employee} from '../employee';
import {EmployeeService} from '../employee.service';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {
  @Input() employee: Employee;
  private get removeEmployeeApi() : string {
    return `/api/employees/${this.employee['id']}`;
  };
  constructor(private employeeService: EmployeeService) {
  }

  deleteEmployee(): void {
    const conf = confirm(`Do you really want to delete ${this.employee['name']}, ${this.employee['position']}?`)
    if (conf) {
      this.employeeService.removeEmployee(this.removeEmployeeApi)
        .subscribe(response => console.log(response));
    }
  }

  ngOnInit() {
  }

}
