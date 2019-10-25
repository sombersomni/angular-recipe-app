import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

export class ShoppingListService {
    private ingredients: Ingredient[];
    onIngredientsChange = new Subject<Ingredient[]>();
    onShopItemEdit = new Subject<number>();
    constructor() {
        this.ingredients = [
            new Ingredient('Chicken', 10),
            new Ingredient('Apple', 5)
        ];
    }

    public getIngredients() {
        return this.ingredients.slice();
    }

    public getIngredient(index: number) {
        return this.ingredients[index]
    }
    public setIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.onIngredientsChange.next(this.ingredients.slice());
    }

    public addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.ingredients = ingredients.slice();
    }

    public updateIngredient(index: number,  ingredient: Ingredient) {
        this.ingredients[index] = ingredient;
        this.onIngredientsChange.next(this.ingredients.slice());
    }

    public deleteIngredient(index: number) {
        this.ingredients.splice(index, 1);
        this.onIngredientsChange.next(this.ingredients.slice());
    }
}