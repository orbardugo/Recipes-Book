import {Http, Response} from "@angular/http";
import {Recipe} from "../recipes/recipe.model";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {RecipeService} from "../recipes/recipe.service";
import {map} from "rxjs/operators";
import {ShoppingListService} from "../shopping-list/shopping-list.service";
import {ShoppingListComponent} from "../shopping-list/shopping-list.component";
import {Ingredient} from "../shared/ingredient.model";
import {AuthService} from "../auth/auth.service";

@Injectable()
export class DatabaseService {

  constructor( private http: Http, private recipeService: RecipeService,
               private shoppingListService: ShoppingListService,
               private authService: AuthService) {}

  storeRecipes() {
    const token = this.authService.getToken();
    return this.http.put('https://ng-recipe-book-48366.firebaseio.com/recipes.json?auth='+ token,
      this.recipeService.getRecipes());
  }

  getRecipes() {
    const token = this.authService.getToken();

    return this.http.get('https://ng-recipe-book-48366.firebaseio.com/recipes.json?auth='+ token)
      .pipe(map(
        (response: Response) => {
          const recipes: Recipe[] = response.json();
          for(let recipe of recipes) {
            if (!recipe['ingredients']) {
                recipe['ingredients'] = [];
            }
          }
          return recipes;
        }
      ))
      .subscribe(
      (recipes: Recipe []) => {
        this.recipeService.setRecipes(recipes);
        console.log(this.recipeService.getRecipes());
      }
    );
  }

  storeShoppingList() {
    const token = this.authService.getToken();
    return this.http.put('https://ng-recipe-book-48366.firebaseio.com/shoppingList.json?auth='+ token,
      this.shoppingListService.getIngredients());
  }


  getShoppingList() {
    const token = this.authService.getToken();
    return this.http.get('https://ng-recipe-book-48366.firebaseio.com/shoppingList.json?auth='+ token).subscribe(
      (response: Response) => {
        const ingredients: Ingredient[] = response.json();
        this.shoppingListService.setShoppingList(ingredients);
      }
    )
  }
}
