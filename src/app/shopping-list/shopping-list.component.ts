import { Component } from "@angular/core"
import { Ingredient } from "../shared/ingredient.model";

@Component({
    selector: "app-shoppint-list",
    templateUrl: "./shopping-list.component.html"
})
export class ShoppingListComponent{
    ingredients: Ingredient[] = [
        new Ingredient("Apple",5),
        new Ingredient("Tomatoes",10),
    ];
    addIngredient(ingredientData: Ingredient){
        this.ingredients.push(ingredientData);
    }

    constructor()
    {

    }
}