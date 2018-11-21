import { Recipe } from "./recipe.model";
import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";

@Injectable()
export class RecipeService{
    recipeSelected = new EventEmitter<Recipe>();

    constructor(private ShoppingListService: ShoppingListService){}

    private recipes: Recipe [] = [
        new Recipe('Tasty Schnitzel',
        'A super-tasty schnitzel - just awsome!',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Wiener-Schnitzel02.jpg/1200px-Wiener-Schnitzel02.jpg',
        [
            new Ingredient('Meat', 1),
            new Ingredient('French Fries', 20)
        ]),
        new Recipe('Big Fat Burger',
        'This is simply tasty!',
        'https://upload.wikimedia.org/wikipedia/commons/d/dc/Lounge_Burger_Wiki.jpg',
        [
            new Ingredient('Bread', 2),
            new Ingredient('Beef Meat', 1),
            new Ingredient('Tomato', 2),
            new Ingredient('lettuce', 1),
            new Ingredient('Onion', 1),
            new Ingredient('pickles', 3),
            new Ingredient('Chedder Cheese', 4)
        ])
    
    ];

    getRecipes(){
        return this.recipes.slice();
    }

    getRecipe (index: number) {
        return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]){
        this.ShoppingListService.addIngredients(ingredients);
    }
}
