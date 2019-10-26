import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  collapsed: boolean = true;
  isAuthenticated: boolean = false;
  private recipesSub$: Subscription;
  //@Output("changePage") changePage = new EventEmitter<string>();
  private userSub$: Subscription;

  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService) { }

  ngOnInit() {
    this.userSub$ = this.authService.observeUser().subscribe((user: User) => {
      console.log(user);
      this.isAuthenticated = !!user;
    });
  }

  ngOnDestroy() {
    this.recipesSub$.unsubscribe();
    this.userSub$.unsubscribe();
  }

  onSaveDate() {
    this.dataStorageService.saveRecipesToDatabase();
  }

  onFetchData() {
    this.recipesSub$ = this.dataStorageService.fetchRecipesFromDatabase().subscribe((recipes: Recipe[]) => {
      console.log('fetch completed')
    })
  }
  
  onLogout() {
    this.authService.logout();
  }

}
