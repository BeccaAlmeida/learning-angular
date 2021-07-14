import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  option: string;
  checked: boolean;

  constructor() {}

  checkedCheckbox($event) {
    this.checked = $event;
    console.log(this.checked);
  }
}
