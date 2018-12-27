import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  nevigateCoice = "recipes";

  onNevigate(choice: string){
    this.nevigateCoice = choice;
  }

  ngOnInit(): void {
    firebase.initializeApp({
      apiKey: "AIzaSyD6QSJELcOqo4tu5DpaZbCiPpToWKz3miQ",
      authDomain: "ng-recipe-book-48366.firebaseapp.com"
    });
  }
}
