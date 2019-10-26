import { Recipe } from './recipe.model';
import { Injectable, EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';
@Injectable()
export class RecipeService {
    //onSelectRecipe = new EventEmitter<Recipe>();
    private onRecipeChanges = new Subject<Recipe[]>();
    private recipes: Recipe[];
    constructor(private shoppingService: ShoppingListService) {
        this.recipes = [
            new Recipe(
              'Chicken Alfredo',
              'A delicious, saucy alfredo on pasta and chicken',
              'https://www.jessicagavin.com/wp-content/uploads/2019/08/chicken-alfredo-8-1200.jpg', 
              [
                new Ingredient('Chicken', 1),
                new Ingredient('Pasta', 1)
              ]
            ),
            new Recipe(
              'Mushroom Burger',
              'A testy vegan burger for the health conscious',
              'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.wholesomelicious.com%2Fwp-content%2Fuploads%2F2015%2F06%2FGrilled-Portabello-Mushroom-Burgers.jpg', 
              [
                new Ingredient('Portobello Mushroom', 1),
                new Ingredient('Avacodo', 1)
              ]
            )
          ];
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