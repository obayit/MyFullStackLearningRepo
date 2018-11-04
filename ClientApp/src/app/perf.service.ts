import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PerfService {
  // reference Url = 'api/Resources/cpuUsage';
  constructor(
    private http: HttpClient
  ) { }
  
  getCounter(url: string): Observable<number>{
    return  this.http.get<number>(url).pipe(
      catchError(this.handleError<any>('getCounter', -1))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
