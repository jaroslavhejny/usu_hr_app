import { Component, OnInit } from '@angular/core';
import {EmployeeService} from '../employee.service';


@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
  private getStatsApi = {
    age: '/employees/statistics_by_age',
    position: '/employees/statistics_by_position'
  };
  statistics = {};
  type: string = 'age';

  constructor(private employeeService: EmployeeService) { }

  get statKeys() {
    if (Object.entries(this.statistics) && Object.entries(this.statistics).length){
      return Object.keys(this.statistics[0]);
    }

    else return []
  }


  getStats(type): void {
    this.employeeService.getStatistics(this.getStatsApi[type])
      .subscribe(statistics => this.statistics = statistics);
  }

  ngOnInit() {
    this.getStats(this.type);
  }

  toggleType() {
    if (this.type === 'age'){
      this.type = 'position'
    }

    else {
      this.type = 'age';
    }
    this.getStats(this.type)
  }
}
