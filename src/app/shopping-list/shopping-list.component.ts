import {Component, OnDestroy, OnInit} from "@angular/core"
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "./shopping-list.service";
import {Route, Router, Routes} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
    selector: "app-shoppint-list",
    templateUrl: "./shopping-list.component.html",
})
export class ShoppingListComponent implements OnInit, OnDestroy{
    ingredients: Ingredient[] = [];
    private  subscription: Subscription;


    constructor(private shoppingListService: ShoppingListService,
                private router: Router)
    {

    }

    ngOnInit(){
        this.router.navigate(['/shopping-list']);
        this.ingredients = this.shoppingListService.getIngredients();
        this.subscription = this.shoppingListService.ingredientsChanged.subscribe(
            (ingredients: Ingredient[]) => {this.ingredients= ingredients;}
        )
    }

  OnEditItem(index: number) {
      this.shoppingListService.startedEditing.next(index);
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
}
