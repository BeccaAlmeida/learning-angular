import { HttpClient } from '@angular/common/http';
import { PersonModel } from './../../model/person.model';
import { Observable, fromEvent } from 'rxjs';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { map, mergeAll } from 'rxjs/operators';

@Component({
  selector: 'app-switch-merge',
  templateUrl: './switch-merge.component.html',
  styleUrls: ['./switch-merge.component.scss'],
})
export class SwitchMergeComponent implements OnInit {

  @ViewChild('search', { read: ElementRef }) search: ElementRef;
  searchInput: string = '';
  people$: Observable<PersonModel[]>;
  private readonly url: string = 'http://localhost:9000';
  constructor(
    private httpClient: HttpClient,
  ) { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    let keyup$ =  fromEvent(this.search.nativeElement, 'keyup');
    let fetch$ = keyup$.pipe(map((e) => this.filterPeople(this.searchInput)));
    fetch$.pipe(mergeAll())
    .subscribe((data) => console.log(data));

    this.people$ = fetch$.pipe(mergeAll());
  }

  filterPeople(searchInput: string): Observable<PersonModel[]> {
    return this.httpClient.get<PersonModel[]>(`${this.url}/${this.searchInput}`)
  }
}
