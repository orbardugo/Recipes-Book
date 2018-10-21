import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  nevigateCoice = "recipes";

  onNevigate(choice: string){
    this.nevigateCoice = choice;

  }
}
