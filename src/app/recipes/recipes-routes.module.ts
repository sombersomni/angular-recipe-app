import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";

import { RecipeComponent } from './recipes.component';
import { AuthGuardService } from '../auth/auth-guard.service';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeStarterComponent } from './recipe-starter/recipe-starter.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeResolver } from './recipe-resolver.service';


const routes: Routes = [
    {
        path: "", component: RecipeComponent, canActivate: [AuthGuardService], children: [
            { path: "create", component: RecipeEditComponent },
            { path: "", component: RecipeStarterComponent },
            { path: ":id", component: RecipeDetailComponent, resolve: [RecipeResolver] },
            { path: ":id/edit", component: RecipeEditComponent, resolve: [RecipeResolver] }
        ]
    }
]

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [RouterModule]
})

export class RecipesRoutesModule {}