import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
    selector: "app-auth",
    templateUrl: "./auth.component.html"
})

export class AuthComponent {
    @ViewChild('authForm', {static: true}) authForm: NgForm;
    isLoginMode = true;

    constructor(private authService: AuthService) {}

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit() {
        const body = this.authForm.value;
        if(this.isLoginMode) {
            this.authService.login(body);
        } else {
            this.authService.signUp(body)
        }
    }
}