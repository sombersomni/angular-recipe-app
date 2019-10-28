import { Recipe } from './recipe.model';
import { Injectable, EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class RecipeService {
    //onSelectRecipe = new EventEmitter<Recipe>();
    private onRecipeChanges = new Subject<Recipe[]>();
    private recipes: Recipe[];
    constructor(private shoppingService: ShoppingListService) {
        this.recipes = [];
    }

    observeRecipes() {
      return this.onRecipeChanges.asObservable();
    }

    getRecipes(): Recipe[]{
        return this.recipes.slice();
    }

    getRecipe(id: number): Recipe {
      console.log('getting recipe of id : ' + id);
      return this.recipes[id];
    }
    
    addIngredientsToShoppingList(ingredients: Ingredient[]) {
      this.shoppingService.addIngredientsToShoppingList(ingredients);
    }

    updateRecipe(recipe: Recipe, index: number) {
      this.recipes[index] = recipe;
      this.onRecipeChanges.next(this.recipes.slice());
    }

    addRecipe(recipe: Recipe) {
      this.recipes.push(recipe);
      this.onRecipeChanges.next(this.recipes.slice());
    }
    
    setRecipes(recipes: Recipe[]) {
      this.recipes = recipes;
      this.onRecipeChanges.next(this.recipes.slice())
    }

    deleteRecipe(index: number) {
      this.recipes.splice(index, 1);
      this.onRecipeChanges.next(this.recipes.slice());
    }

}