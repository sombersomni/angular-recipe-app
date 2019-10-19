import { Ingredient } from '../shared/ingredient.model';
import { EventEmitter } from '@angular/core';

export class ShoppingListService {
    private ingredients: Ingredient[];
    onIngredientsChange = new EventEmitter();
    constructor() {
        this.ingredients = [
            new Ingredient('Chicken', 10),
            new Ingredient('Apple', 5)
        ];
    }

    public getIngredients() {
        return this.ingredients.slice();
    }
    public setIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.onIngredientsChange.emit();
    }
    public setRecipeIngredients(ingredients: Ingredient[]) {
        this.ingredients = this.ingredients.concat(ingredients);
        this.onIngredientsChange.emit();
    }
}