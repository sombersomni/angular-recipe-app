import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  page: string = "recipes";

  onPageChange(data: { newPage: string }) {
    this.page = data.newPage;
  }
}
