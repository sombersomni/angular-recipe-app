import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  page: string = "recipes";

  onNavigate(newPage: string) {
    this.page = newPage;
  }
}
