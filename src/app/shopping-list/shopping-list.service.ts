import { Ingredient } from "../shared/ingredient.model";
import {Subject} from "rxjs";
import index from "@angular/cli/lib/cli";


export class ShoppingListService{
    ingredientsChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();
    private ingredients: Ingredient[] = [
        new Ingredient("Apple",5),
        new Ingredient("Tomatoes",10),
    ];

    getIngredients(){
        return this.ingredients.slice();
    }

    getIngredient(index: number) {
      return this.ingredients[index];
    }

    addIngredient(ingredientData: Ingredient){
        this.ingredients.push(ingredientData);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    addIngredients(ingredients: Ingredient[]){
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    updateIngrident(index: number, newIngredient: Ingredient) {

      this.ingredients[index] = newIngredient;
      this.ingredientsChanged.next(this.ingredients.slice());

    }

  deleteIngridient(index: number) {
    this.ingredients.splice(index,1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  setShoppingList(ingredients: Ingredient[]) {
    this.ingredients = ingredients;
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
