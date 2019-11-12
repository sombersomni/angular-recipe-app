import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home-component.html',
    styleUrls: ['./home-component.css'],
})

export class HomeComponent implements OnInit {
    public welcomeMessage: string = 'Welcome to Cook Look';
    public description: string = 'Create your own recipes and automatically manage a shopping list for the ingredients you need';
    constructor(private router: Router) {}
    ngOnInit() {}
    public goToLogin() {
        this.router.navigate(['auth']);
    }
}