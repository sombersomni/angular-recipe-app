import { Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  collapsed:boolean = true;
  @Output("changePage") changePage = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {
  }

  setPage(newPage: string) {
    console.log('setting page to : ' + newPage);
    this.changePage.emit(newPage);
  }
}
