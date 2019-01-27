import {Component, OnDestroy, OnInit} from '@angular/core'
import { Recipe } from '../recipe.model'
import { RecipeService } from '../recipe.service';
import {ActivatedRoute, Router} from "@angular/router";
import {Observable, Subscription} from "rxjs";
import * as fromAuth from "../../auth/store/auth.reducers";


@Component({
    selector: "app-recipe-list",
    templateUrl: "./recipe-list.component.html"
})
export class RecipeListComponent implements OnInit, OnDestroy{
  recipes: Recipe[];
  subscrition: Subscription;
  authState: Observable<fromAuth.State>;
  isAuth: boolean;

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(){
    this.authState.subscribe( response => {
      this.isAuth = response.authenticated;
    });
    this.subscrition = this.recipeService.recipesChanged.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    );
    this.recipes = this.recipeService.getRecipes();
  }

  onNewRecipe() {
    if(!this.isAuth){
      this.router.navigate(['signin']);
    }
    else
      this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy(): void {
    this.subscrition.unsubscribe();
  }
 

}
