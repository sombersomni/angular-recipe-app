import { NgModule } from "@angular/core";
import { RecipeComponent } from './recipes.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeStarterComponent } from './recipe-starter/recipe-starter.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RecipesRoutesModule } from './recipes-routes.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
    declarations: [
        RecipeComponent,
        RecipeListComponent,
        RecipeItemComponent,
        RecipeDetailComponent,
        RecipeStarterComponent,
        RecipeEditComponent
    ],
    imports: [
        RouterModule, 
        SharedModule,
        ReactiveFormsModule,
        RecipesRoutesModule
        ]
})

export class RecipesModule { }