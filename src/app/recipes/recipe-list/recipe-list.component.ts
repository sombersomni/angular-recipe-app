import { Component, OnInit, OnDestroy } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription, concat } from 'rxjs';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  recipes: Recipe[];
  recipeChangeSub$: Subscription;
  constructor(private recipeService: RecipeService,
    private router: Router, 
    private route: ActivatedRoute,
    private dataStorageService: DataStorageService) { }

  ngOnInit() {
    const recipeObs$ = concat(this.dataStorageService.fetchRecipesFromDatabase(), this.recipeService.observeRecipes());

    this.recipeChangeSub$ = recipeObs$.subscribe((recipes: Recipe[]) => {
      this.recipes = recipes;
    })
  }

  ngOnDestroy() {
    this.recipeChangeSub$.unsubscribe();
    
  }
  onCreateRecipe() {
    this.router.navigate(["create"], {relativeTo: this.route});
  }
}
