import {Injectable, EventEmitter} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';

import {Employee} from './employee';
import {MessageService} from './message.service';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private baseUrl = 'http://ec2-18-224-0-3.us-east-2.compute.amazonaws.com/api';
  dispatcher: EventEmitter<any> = new EventEmitter();
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) {
  }

  getEmitter() {
    return this.dispatcher;
  };

  getEmployees(url): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.baseUrl + url)
      .pipe(
        tap(() => this.log('got employees')),
        catchError(this.handleError<Employee[]>('getEmployee', []))
      );
  };

  getStatistics(url):Observable<any> {
    return this.http.get<any>(this.baseUrl + url)
      .pipe(
        tap(() => this.log('Fetch statistics')),
        catchError(this.handleError<Employee[]>('getStats', []))
      )
  };

  createEmployee(url, employee): Observable<Employee[]> {
    return this.http.post<Employee[]>(this.baseUrl + url, employee, this.httpOptions)
      .pipe(
        tap(() => this.log(`${employee['position']}, ${employee['name']}, created`)),
        catchError(this.handleError<Employee[]>('createEmployee', []))
      );
  };

  removeEmployee(url): Observable<any> {
    return this.http.delete<Employee[]>(this.baseUrl + url, this.httpOptions)
      .pipe(
        tap(() => {
          this.log('deleted');
          this.dispatcher.emit('getEmployees');
        }),
        catchError(this.handleError<Employee[]>('deleteEmployee', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`${message}`);
  }
}
