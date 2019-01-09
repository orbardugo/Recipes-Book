import { Component} from '@angular/core';
import {DatabaseService} from "../../repository/database.service";
import {AuthService} from "../../auth/auth.service";


@Component({
    selector: "app-header",
    templateUrl: "./header.component.html"
})    


export class HeaderComponent{

constructor(private databaseService: DatabaseService,
            private authService: AuthService) {}

  isCollapsed = false;
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

  logOut() {
      this.authService.signOutUser();
  }
}
