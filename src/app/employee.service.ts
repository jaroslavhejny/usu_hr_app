import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';

import {Employee} from './employee';
import {MessageService} from './message.service';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private baseUrl = 'http://ec2-18-224-0-3.us-east-2.compute.amazonaws.com';


  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) {
  }

  getEmployees(url): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.baseUrl + url)
      .pipe(
        tap(_ => this.log('fetched')),
        catchError(this.handleError<Employee[]>('getEmployee', []))
      );
  }
  createEmployee(url, employee): Observable<Employee[]> {
    return this.http.post<Employee[]>(this.baseUrl + url, employee, this.httpOptions)
      .pipe(
        tap(_ => this.log('fetched')),
        catchError(this.handleError<Employee[]>('createEmployee', []))
      );
  }
  removeEmployee(url): Observable<any> {
    return this.http.delete<Employee[]>(this.baseUrl + url, this.httpOptions)
      .pipe(
        tap(_ => this.log('deleted')),
        catchError(this.handleError<Employee[]>('deleteEmployee', []))
      );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`MsgService: ${message}`);
  }
}
