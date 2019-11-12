import { Injectable } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Recipe } from '../recipes/recipe.model';
import { map, tap, take, exhaustMap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
    private firebaseUrl: string = "https://cook-look-book.firebaseio.com";

    constructor(
        private recipeService: RecipeService,
        private http: HttpClient,
        private authService: AuthService) { }

    saveRecipesToDatabase() {
        const recipes = this.recipeService.getRecipes();
        this.http.put<Recipe[]>(`${this.firebaseUrl}/recipes.json`, recipes)
            .subscribe(response => response);
    }

    fetchRecipesFromDatabase() {
        return this.authService.observeUser().pipe(
            take(1),
            exhaustMap(user => this.http.get<Recipe[]>(
                `${this.firebaseUrl}/recipes.json`)
                ),
            map((recipes: Recipe[]) => recipes.map((recipe: Recipe) => ({
                ...recipe,
                ingredients: recipe.ingredients ? recipe.ingredients : []
            }))),
            tap((recipes: Recipe[]) => {
                this.recipeService.setRecipes(recipes);
            }));

    }
}