import { Component, OnInit, Output, EventEmitter, OnDestroy} from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipes/recipe.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  collapsed:boolean = true;
  recipesSub$: Subscription;
  @Output("changePage") changePage = new EventEmitter<string>();
  constructor(private dataStorageService: DataStorageService) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.recipesSub$.unsubscribe();
  }

  onSaveDate() {
    this.dataStorageService.saveRecipesToDatabase();
  }

  onFetchData() {
      this.recipesSub$ = this.dataStorageService.fetchRecipesFromDatabase().subscribe((recipes: Recipe[]) => {
      console.log('fetch completed')
    })
  }

}
