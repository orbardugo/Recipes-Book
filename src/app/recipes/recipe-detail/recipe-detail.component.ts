import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Store} from "@ngrx/store";

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import {AuthService} from "../../auth/auth.service";
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';
import * as fromApp from '../../store/app.reducers';
import * as fromAuth from "../../auth/store/auth.reducers";
import {Observable} from "rxjs";



@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;
  authState: Observable<fromAuth.State>;
  isAuth: boolean;
  
  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute,
              private  router: Router,
              private authService: AuthService,
              private store: Store<fromApp.AppState>){}

  ngOnInit() {
    this.authState.subscribe( response => {
      this.isAuth = response.authenticated;
    });

    this.route.params.subscribe(
      (params: Params) => {
          this.id = +params['id'];
          this.recipe = this.recipeService.getRecipe(this.id);
      }
    );
  }


  OnEditRecipe() {

    if(!this.isAuth)
      this.router.navigate(['signin']);
    else
      this.router.navigate(['edit'], {relativeTo: this.route});
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

  onAddToShoppingList() {
    this.store.dispatch(new ShoppingListActions.AddIngredients(this.recipe.ingredients));
  }

  onDeleteRecipe() {
      this.recipeService.deleteRecipe(this.id);
      this.router.navigate(['/recipes']);
      
  }
}
