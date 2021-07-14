import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IonRippleEffect } from '@ionic/angular';
import { from, fromEvent, interval, Observable, Subject, Subscription, timer } from 'rxjs';
import { debounceTime, delay, filter, first, last, map, take, takeUntil, takeWhile, tap } from 'rxjs/operators';

@Component({
  selector: 'app-operators',
  templateUrl: './operators.component.html',
  styleUrls: ['./operators.component.scss'],
})
export class OperatorsComponent implements OnInit {

  @ViewChild(IonRippleEffect) ripple: IonRippleEffect;

  @Input() tipo: string;
  formSearch: FormGroup;
  serchInput: string = '';

  constructor(
    public formbuilder: FormBuilder,
  ) { }

  ngOnInit() {

    this.formSearch = this.formbuilder.group({
      tipo: ['']
    })
  }



  mapClick() {
    from([1, 2, 3 ,4 ,5 , 6, 7])
      .pipe(
        map(i => 2 * i),
        map(i => i * 10),
        delay(1000)
    )
    .subscribe(i => console.log(i));

    fromEvent(document, 'click')
      .pipe(
        map((e: MouseEvent) => ({x: e.screenX, y: e.screenY}))
    ).subscribe((pos) => console.log(pos));
  }

  filterClick() {
    from([1, 2, 3 ,4 ,5 , 6, 7])
      .pipe(
        filter(i => i%2=== 1)
    ).subscribe(i => console.log(i));

    interval(2000).pipe(
      filter(i => i%2 === 0),
      map(i => "Value: " + i),
      delay(1000)
    ).subscribe(i => console.log(i))
  }

  tapClick() {
    interval(2000)
    .pipe(
      tap(i => console.log('')),
      tap(i => console.warn('Before filtering: ' + i)),
      filter(i => i%2 === 0),
      tap(i => console.warn('After filtering: ' + i)),
      map(i => "Value: " + i),
      tap(i => console.warn('After maping: ' + i)),
      delay(1000)
    ).subscribe(i => console.log(i))
  }

  takeClick() {
    const observable = new Observable((observer) => {
      let i;
      for(i = 0; i < 20; i++)
        setTimeout(() => observer.next(Math.floor(Math.random() * 100)), i * 100);
      setTimeout(() => observer.complete(), i * 100)
    })

    const s: Subscription = observable
    .pipe(
      tap(i => console.log(i)),
      take(10)
    ).subscribe(v =>
      console.log('Output: ' + v),
    (error) => console.error(error),
    () => console.log('Complete!')
    );

    const interv = setInterval(() => {
      console.log('Checking...');
      if(s.closed) {
        console.warn("Subcription CLOSE!");
        clearInterval(interv);
      }
    }, 200)
  }

  firstClick() {
    const observable = new Observable((observer) => {
      let i;
      for(i = 0; i < 20; i++)
        setTimeout(() => observer.next(Math.floor(Math.random() * 100)), i * 100);
      setTimeout(() => observer.complete(), i * 100)
    })

    const s: Subscription = observable
    .pipe(
      tap(i => console.log(i)),
      first()
    ).subscribe(v =>
      console.log('Output: ' + v),
    (error) => console.error(error),
    () => console.log('Complete!')
    );

    const interv = setInterval(() => {
      console.log('Checking...');
      if(s.closed) {
        console.warn("Subcription CLOSE!");
        clearInterval(interv);
      }
    }, 200)
  }

  lastClick() {
    const observable = new Observable((observer) => {
      let i;
      for(i = 0; i < 20; i++)
        setTimeout(() => observer.next(Math.floor(Math.random() * 100)), i * 100);
      setTimeout(() => observer.complete(), i * 100)
    })

    const s: Subscription = observable
    .pipe(
      tap(i => console.log(i)),
      last()
    ).subscribe(v =>
      console.log('Output: ' + v),
    (error) => console.error(error),
    () => console.log('Complete!')
    );

    const interv = setInterval(() => {
      console.log('Checking...');
      if(s.closed) {
        console.warn("Subcription CLOSE!");
        clearInterval(interv);
      }
    }, 200)
  }

  launchRipple() {
    const rippleRef = this.ripple.addRipple( 10, 10)
    rippleRef.finally();
  }

  debounceTimeClick() {
    fromEvent(document, 'click').pipe(
      tap((e) => console.log('Click')),
      debounceTime(1000)
    )
    .subscribe(
      (e: MouseEvent) => {
        console.log("click with dounceTime" + e);
        this.launchRipple();
      }
    )
  }

  searchEntry$: Subject<string> = new Subject<string>();
  searchBy_usingDebounce(event) {
    this.searchEntry$.next(this.serchInput);
  }

  debounceTimeSearch() {
    this.searchEntry$
    .pipe(debounceTime(1000))
    .subscribe((s) => console.log(s))
  }

  takeWhileClick() {
    interval(500)
    .pipe(
      takeWhile((value, index) => (value < 5))
    )
    .subscribe(
      (i) => console.log('takeWhile: ', i),
      (error) => console.error(error),
      () => console.log('Completed')
      )
  }

  takeUntilClick() {

    let dueTime$ = timer(5000)

    interval(500)
    .pipe(
      takeUntil(dueTime$)
    )
    .subscribe(
      (i) => console.log('takeUntil: ', i),
      (error) => console.error(error),
      () => console.log('Completed')
      )
  }
}
