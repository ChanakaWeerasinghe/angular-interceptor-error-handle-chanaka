import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map } from 'rxjs/operators';
import 'rxjs/add/observable/of';

@Component({
  selector: 'my-app',
  template: `
        <!-- <div><h3>Response</h3>{{response|async|json}}</div> -->
        <button (click)="request()">Make request</button>
        <div *ngIf="showError"> {{error}} </div>
        `
        
  ,
})
export class AppComponent {
  response: Observable<any>;
  showError = false;
  error = 'someError';
  constructor(private http: HttpClient) { }

  request() {  
    const url = 'GoalTree/GetById/'; 
    let headers = new HttpHeaders();
    headers = headers.append('handleError', 'onService');
    this.http.get(url, {headers: headers})
      .pipe(
      map((data: any) => {
        this.showError = false; 
      }),
      catchError(this.handleErrorM)
      )
      .subscribe(data => {
        console.log('data', data);
      })
  }

  handleErrorM = (error: HttpErrorResponse) => {
    console.log('Handle on Component', error);

    if (error.status === 401) {
      this.showError = true;
      this.error = error.message;
      return Observable.of(error.message);

    }
    this.showError = true;
    this.error = error.message;
    return Observable.of(error.message);
  };
}
