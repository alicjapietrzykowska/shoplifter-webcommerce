import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dropmenu',
  templateUrl: './dropmenu.component.html',
  styleUrls: ['./dropmenu.component.scss'],
})
export class DropmenuComponent implements OnInit {
  //@ts-ignore
  @Input() activeMenuItem;

  ngOnInit() {}
}
