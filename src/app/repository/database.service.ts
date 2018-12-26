import {Http, Response} from "@angular/http";
import {Recipe} from "../recipes/recipe.model";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {RecipeService} from "../recipes/recipe.service";
import {map} from "rxjs/operators";
import {ShoppingListService} from "../shopping-list/shopping-list.service";
import {ShoppingListComponent} from "../shopping-list/shopping-list.component";
import {Ingredient} from "../shared/ingredient.model";

@Injectable()
export class DatabaseService {

  constructor( private http: Http, private recipeService: RecipeService, private shoppingListService: ShoppingListService) {}

  storeRecipes() {
    return this.http.put('https://ng-recipe-book-48366.firebaseio.com/recipes.json',
      this.recipeService.getRecipes());
  }

  getRecipes() {
    return this.http.get('https://ng-recipe-book-48366.firebaseio.com/recipes.json')
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
    return this.http.put('https://ng-recipe-book-48366.firebaseio.com/shoppingList.json',
      this.shoppingListService.getIngredients());
  }


  getShoppingList() {
    return this.http.get('https://ng-recipe-book-48366.firebaseio.com/shoppingList.json').subscribe(
      (response: Response) => {
        const ingredients: Ingredient[] = response.json();
        this.shoppingListService.setShoppingList(ingredients);
      }
    )
  }
}
