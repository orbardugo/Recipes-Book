import { Component, OnInit } from "@angular/core"
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "./shopping-list.service";
import {Route, Router, Routes} from "@angular/router";

@Component({
    selector: "app-shoppint-list",
    templateUrl: "./shopping-list.component.html",
})
export class ShoppingListComponent implements OnInit{
    ingredients: Ingredient[] = [];


    constructor(private shoppingListService: ShoppingListService,
                private router: Router)
    {

    }

    ngOnInit(){
        this.router.navigate(['/shopping-list']);
        this.ingredients = this.shoppingListService.getIngredients();
        this.shoppingListService.ingredientsChanged.subscribe(
            (ingredients: Ingredient[]) => {this.ingredients= ingredients;}
        )
    }
}
