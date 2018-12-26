import { Component} from '@angular/core';
import {DatabaseService} from "../repository/database.service";


@Component({
    selector: "app-header",
    templateUrl: "./header.component.html"
})    


export class HeaderComponent{

constructor(private databaseService: DatabaseService) {}
  onSaveData() {
    this.databaseService.storeRecipes().subscribe(
      (response) => {console.log(response); },
      (error) => console.log(error)
    );
    this.databaseService.storeShoppingList().subscribe(
      (response) => {console.log(response); },
      (error) => console.log(error)
    );
  }

  onFetchData() {
    this.databaseService.getRecipes();
    this.databaseService.getShoppingList();
  }
}
