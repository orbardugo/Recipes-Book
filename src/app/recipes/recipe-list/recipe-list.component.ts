import { Component } from '@angular/core'
import { Recipe } from '../recipe.model'

@Component({
    selector: "app-recipe-list",
    templateUrl: "./recipe-list.component.html"
})
export class RecipeListComponent{
    recipes: Recipe [] = [
        new Recipe('A Test Recipe',
        'This is simply a test',
        'https://cdn.pixabay.com/photo/2017/07/16/10/43/recipe-2508859_1280.jpg'),
        new Recipe('A Test Recipe',
        'This is simply a test',
        'https://cdn.pixabay.com/photo/2017/07/16/10/43/recipe-2508859_1280.jpg')
    
    ];
}