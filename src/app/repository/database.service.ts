import {Recipe} from "../recipes/recipe.model";
import {Injectable} from "@angular/core";
import {RecipeService} from "../recipes/recipe.service";
import {map} from "rxjs/operators";
import {Ingredient} from "../shared/ingredient.model";
import {AuthService} from "../auth/auth.service";
import {HttpClient, HttpRequest} from "@angular/common/http";
import {Store} from "@ngrx/store";
import {GetIngredientsFromServer} from "../shopping-list/store/shopping-list.actions";

@Injectable()
export class DatabaseService {
  constructor( private httpClient: HttpClient, private recipeService: RecipeService,
               private authService: AuthService,
               private store: Store<{shoppingList: {ingredients: Ingredient[]}}>) {}

  storeRecipes() {
    //const token = this.authService.getToken();
    // return this.httpClient.put('https://ng-recipe-book-48366.firebaseio.com/recipes.json?auth='+ token,
    //     //   this.recipeService.getRecipes());
    const req = new HttpRequest('PUT','https://ng-recipe-book-48366.firebaseio.com/recipes.json',
      this.recipeService.getRecipes(), {reportProgress: true} );
    return this.httpClient.request(req);
  }

  getRecipes() {
    //const token = this.authService.getToken();

    return this.httpClient.get<Recipe[]>('https://ng-recipe-book-48366.firebaseio.com/recipes.json'
      )
      .pipe(map(
        (recipes) => {
          //const recipes: Recipe[] = response.json();
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
        //console.log(this.recipeService.getRecipes());
      }
    );
  }

  storeShoppingList() {
    const token = this.authService.getToken();
    let ingredients: Ingredient[] = [];
    this.store.select('shoppingList').subscribe( (data : any) => {ingredients = data.ingredients});
    return this.httpClient.put('https://ng-recipe-book-48366.firebaseio.com/shoppingList.json?auth='+ token,
       ingredients);

  }


  getShoppingList() {
    const token = this.authService.getToken();
    return this.httpClient.get<Ingredient[]>('https://ng-recipe-book-48366.firebaseio.com/shoppingList.json?auth='+ token).subscribe(
      (ingredients) => {
        //const ingredients: Ingredient[] = response.json();
        //this.shoppingListService.setShoppingList(ingredients);
        this.store.dispatch(new GetIngredientsFromServer(ingredients))
      }
    )
  }
}
