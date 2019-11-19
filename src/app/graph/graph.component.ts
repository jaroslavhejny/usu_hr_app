import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {
  @Input() values: [];

  data: Object;
  dataSource: any = [{value: 150}, {value: 100}];
  type: string;
  width: string;
  height: string;


  constructor() {
    this.type = 'column2d';
    this.width = '400';
    this.height = '400';
    this.data = {
      chart: {
        'xAxisName': 'Age range',
        'yAxisName': 'Count',
      },
      data: this.dataSource
    };
  }

  ngOnInit() {
  }

  showValues() {
    this.dataSource = this.convertValues;
    console.log(this.values);
    console.log(this.convertValues);
  }



  get convertValues() {
    if (this.values) {
      for (let data of this.values) {
        data['value'] = data['count'];
        data['label'] = data['ageRange'];
      }
    }


    return this.values;
  }


}
