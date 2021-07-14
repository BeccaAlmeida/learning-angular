import { catchError, map, retry, retryWhen, tap, timeout } from 'rxjs/operators';
import { Observable, of, throwError, timer } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-handling',
  templateUrl: './error-handling.component.html',
  styleUrls: ['./error-handling.component.scss'],
})
export class ErrorHandlingComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

  startTest() {
    let obj: Observable<any> = new Observable((observer) => {
      for (let i = 0;  i < 10; i++) {
        if (i === 7) {
          observer.error(`An error occurred when i = ${i}`);
        } else {
          observer.next(i);
        }
      }
    })
    obj.pipe(
      map(i => i * 10),
      tap(i => console.log('Before error hendling ' + i)),
      catchError(error => {
        console.error('Inside catchError: ' + error);
        //return of(0)
        return throwError('throwerror: error ' )
      }),
      //retry(2),
      retryWhen(i => timer(5000))
        )
        /*.subscribe(
          (i) => console.log('Normal output: ' + i),
          error => console.log(error),
          () => console.log('Completed!')
        )*/
        let obj2: Observable<any> = new Observable((observer) => {
          timer(2000).subscribe((n) => observer.next(1000));
          timer(2500).subscribe((n) => observer.complete())
        });
        obj2
        .pipe(
          timeout(1000)
        )
        .subscribe(
          i => console.log('N: ' + i),
          error => console.log(error),
          () => console.log('Completed!')
        )
  }

}
