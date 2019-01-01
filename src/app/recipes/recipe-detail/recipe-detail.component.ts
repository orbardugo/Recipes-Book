import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;
  
  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute,
              private  router: Router,
              private authService: AuthService){}

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
          this.id = +params['id'];
          this.recipe = this.recipeService.getRecipe(this.id);
      }
    );
  }

  sendIngredientsToShoppingList()
  {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  OnEditRecipe() {
    if(!this.authService.isAuthenticated())
      this.router.navigate(['signin']);
    else
      this.router.navigate(['edit'], {relativeTo: this.route});
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

  onDeleteRecipe() {
      this.recipeService.deleteRecipe(this.id);
      this.router.navigate(['/recipes']);
      
  }
}
