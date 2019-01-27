import {Component, OnInit} from '@angular/core';
import {DatabaseService} from "../../repository/database.service";
import {AuthService} from "../../auth/auth.service";
import {Store} from "@ngrx/store";
import * as fromApp from "../../store/app.reducers";
import * as fromAuth from "../../auth/store/auth.reducers";
import {Observable} from "rxjs";


@Component({
    selector: "app-header",
    templateUrl: "./header.component.html"
})    


export class HeaderComponent implements OnInit{
  authState: Observable<fromAuth.State>;

constructor(private databaseService: DatabaseService,
            private authService: AuthService,
            private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
  this.authState = this.store.select('auth')
  }

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

  // isAuthenticated() {
  //   return this.authService.isAuthenticated();
  // }


}
