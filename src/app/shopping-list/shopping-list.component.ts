import {Component, OnInit} from "@angular/core"
import { Ingredient } from "../shared/ingredient.model";
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import * as fromShoppingList from './store/shopping-list.reducers'
import * as ShoppingListActions from "./store/shopping-list.actions";


@Component({
    selector: "app-shopping-list",
    templateUrl: "./shopping-list.component.html",
})
export class ShoppingListComponent implements OnInit{


  shoppingListState: Observable<{ingredients: Ingredient[]}>;
  //shoppingListState: Ingredient [];
  //private  subscription: Subscription;


    constructor(private store: Store<fromShoppingList.AppState>)
    {

    }

    ngOnInit(){
      this.shoppingListState = this.store.select('shoppingList');
      //this.shoppingListState = this.shoppingListService.getIngredients();
        // this.subscription = this.shoppingListService.ingredientsChanged.subscribe(
        //     (ingredients: Ingredient[]) => {this.ingredients= ingredients;}
        // )
    }

  onEditItem(index: number) {
      this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }


}
