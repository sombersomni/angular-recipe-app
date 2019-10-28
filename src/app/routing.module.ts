import { RecipeComponent } from "./recipes/recipes.component";
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { Routes, RouterModule, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { NgModule } from '@angular/core';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeResolver } from './recipes/recipe-resolver.service';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeStarterComponent } from './recipes/recipe-starter/recipe-starter.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuardService } from './auth/auth-guard.service';
import { HomeComponent } from './home/home.component';

// { path: "", redirectTo: "/recipes", pathMatch: "full" },
const appRoutes: Routes = [
    { path: "", redirectTo: "/recipes", pathMatch: "full" },
    {
        path: "recipes", component: RecipeComponent, canActivate: [AuthGuardService], children: [
            { path: "create", component: RecipeEditComponent},
            { path: "", component: RecipeStarterComponent},
            { path: ":id", component: RecipeDetailComponent, resolve: [RecipeResolver] },
            { path: ":id/edit", component: RecipeEditComponent, resolve: [RecipeResolver]}
        ]
    },
    { path: "shopping-list", component: ShoppingListComponent },
    { path: "auth", component: AuthComponent }
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

