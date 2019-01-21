import {NgModule} from "@angular/core";
import {PreloadAllModules, RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./core/home/home.component";
import {ShoppingListComponent} from "./shopping-list/shopping-list.component";


const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule'},
  //{path: 'shopping-list', loadChildren: './shopping-list/shopping-list.module#ShoppingListModule'},
  { path: 'shopping-list', component: ShoppingListComponent },
  {path: '', redirectTo: '/recipes', pathMatch: "full"},

];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules })
  ],
  exports: [
    RouterModule
  ]
})

export  class AppRoutingModule {
  
}
  

