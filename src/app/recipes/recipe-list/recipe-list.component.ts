import {Component, OnDestroy, OnInit} from '@angular/core'
import { Recipe } from '../recipe.model'
import { RecipeService } from '../recipe.service';
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {AuthService} from "../../auth/auth.service";

@Component({
    selector: "app-recipe-list",
    templateUrl: "./recipe-list.component.html"
})
export class RecipeListComponent implements OnInit, OnDestroy{
  recipes: Recipe[];
  subscrition: Subscription;
  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService) { }

  ngOnInit(){
    this.subscrition = this.recipeService.recipesChanged.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    );
    this.recipes = this.recipeService.getRecipes();
  }

  onNewRecipe() {
    if(!this.authService.isAuthenticated()){
      this.router.navigate(['signin']);
    }
    else
      this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy(): void {
    this.subscrition.unsubscribe();
  }
 

}
