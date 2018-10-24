import { Ingredient } from "../shared/ingredient.model";
import { EventEmitter } from "@angular/core";

export class ShoppingListService{
    ingredientsChanged = new EventEmitter<Ingredient[]>();
    private ingredients: Ingredient[] = [
        new Ingredient("Apple",5),
        new Ingredient("Tomatoes",10),
    ];

    getIngredients(){
        return this.ingredients.slice();
    }

    addIngredient(ingredientData: Ingredient){
        this.ingredients.push(ingredientData);
        this.ingredientsChanged.emit(this.ingredients.slice());
    }
}