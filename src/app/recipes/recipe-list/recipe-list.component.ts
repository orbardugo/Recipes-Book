import { Component, Output,EventEmitter } from '@angular/core'
import { Recipe } from '../recipe.model'

@Component({
    selector: "app-recipe-list",
    templateUrl: "./recipe-list.component.html"
})
export class RecipeListComponent{
    recipes: Recipe [] = [
        new Recipe('A Test Recipe',
        'This is simply a test',
        'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg'),
        new Recipe('A Test Recipe 2',
        'This is simply a test',
        'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg')
    
    ];
    @Output() recipeWasSelected = new EventEmitter<Recipe>();

  constructor() { }

  recipeDetails(recipeData: Recipe){
    this.recipeWasSelected.emit(recipeData);
  }

}