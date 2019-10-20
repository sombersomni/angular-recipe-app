import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { RecipeService } from './recipe.service';
import { Observable } from 'rxjs';


@Injectable({providedIn: 'root'})
export class RecipeResolver implements Resolve<Recipe> {
    constructor(private recipe: RecipeService) {}
    resolve(route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot): Observable<Recipe> | Promise<Recipe> | Recipe {
            return this.recipe.getRecipe(+route.paramMap.get('id'));
    }
}