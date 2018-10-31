import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs'
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PerfService {
  private cpuUsageUrl = 'api/Resources/cpuUsage';

  constructor(
    private http: HttpClient
  ) { }
  
  getCpu(): Observable<number>{
    return  this.http.get<number>(this.cpuUsageUrl).pipe(
      catchError(this.handleError<any>('getHeroes', []))
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
