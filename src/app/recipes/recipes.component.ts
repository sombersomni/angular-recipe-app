import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Component({
    selector: 'app-recipes',
    templateUrl: 'recipes.component.html',
    styleUrls: ['recipes.component.css'],
    providers: [RecipeService]
})

export class RecipeComponent implements OnInit {
    currentRecipe: Recipe;

    constructor(private recipeService: RecipeService) {}

    ngOnInit() {
        this.recipeService.onSelectRecipe.subscribe((recipe: Recipe) => {
            this.currentRecipe = recipe;
        })
    }
}