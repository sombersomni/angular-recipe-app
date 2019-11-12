import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home-component';
//{ path: "", redirectTo: "/recipes", pathMatch: "full" }
const appRoutes: Routes = [
    { path: "", component: HomeComponent },
    { path: "recipes", loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipesModule) },
    { path: "shopping-list", loadChildren: () => import('./shopping-list/shopping-list.module').then(m => m.ShoppingListModule) },
    { path: "auth", loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) }
]
//loadChildren: "./recipes/recipes.module#RecipesModule"

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule {

}

