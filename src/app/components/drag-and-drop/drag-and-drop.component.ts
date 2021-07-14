import { takeUntil } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-drag-and-drop',
  templateUrl: './drag-and-drop.component.html',
  styleUrls: ['./drag-and-drop.component.scss'],
})
export class DragAndDropComponent implements OnInit {

  @ViewChild('myrect') myrect: ElementRef;

  top: number = 70;
  left: number = 70;

  constructor() { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    let mousedown = fromEvent(this.myrect.nativeElement, 'mousedown');
    let mousemove = fromEvent(document, 'mousemove');
    let mouseup = fromEvent(document, 'mouseup');

    mousedown.subscribe((ed: MouseEvent) => {
      let x = ed.screenX;
      let y = ed.screenY;

      mousemove
      .pipe(takeUntil(mouseup))
      .subscribe((em: MouseEvent) => {
        console.log(em);
        let offsetx = x - em.pageX;
        let offsety = y - em.pageY;

        this.top -= offsety;
        this.left -= offsetx;

        x = em.pageX;
        y = em.pageY;
      })
    });
  }
}
