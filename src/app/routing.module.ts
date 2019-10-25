import { RecipeComponent } from "./recipes/recipes.component";
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { Routes, RouterModule, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { NgModule } from '@angular/core';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeResolver } from './recipes/recipe-resolver.service';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeStarterComponent } from './recipes/recipe-starter/recipe-starter.component';

const appRoutes: Routes = [
    { path: "", redirectTo: "/recipes", pathMatch: "full" },
    {
        path: "recipes", component: RecipeComponent, children: [
            { path: "create", component: RecipeEditComponent},
            { path: "", component: RecipeStarterComponent},
            { path: ":id", component: RecipeDetailComponent, resolve: { recipe: RecipeResolver } },
            { path: ":id/edit", component: RecipeEditComponent}
        ]
    },
    { path: "shopping-list", component: ShoppingListComponent }
]

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule {

}

