import { Recipe } from './recipe.model';
import { Injectable, EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
@Injectable()
export class RecipeService {
    onSelectRecipe = new EventEmitter<Recipe>();
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

    getRecipes() {
        return this.recipes.slice();
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
      this.shoppingService.setRecipeIngredients(ingredients)
    }

}