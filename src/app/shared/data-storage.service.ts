import { Injectable } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../recipes/recipe.model';
import { map, tap } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class DataStorageService {
    private firebaseUrl: string = "https://cook-look-book.firebaseio.com/";
    
    constructor(
        private recipeService: RecipeService, 
        private http: HttpClient) {}

    saveRecipesToDatabase() {
        const recipes = this.recipeService.getRecipes();
        this.http.put<Recipe[]>(`${this.firebaseUrl}recipes.json`, recipes)
        .subscribe(response => {
            console.log(response);
        })
    }

    fetchRecipesFromDatabase() {
        return this.http.get<Recipe[]>(`${this.firebaseUrl}recipes.json`)
        .pipe(map((recipes: Recipe[]) => recipes.map((recipe: Recipe) => ({ 
                ...recipe, 
                ingredients: recipe.ingredients ? recipe.ingredients : []
        }))),
        tap((recipes: Recipe[]) => {
            console.log(recipes, 'from server')
            this.recipeService.setRecipes(recipes);
        }));
      
    }
}