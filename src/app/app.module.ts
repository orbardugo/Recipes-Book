import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { AppRoutingModule } from './app-routing.module';
import { RecipeService } from './recipes/recipe.service';
import { AuthService } from './auth/auth.service';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import {DatabaseService} from "./repository/database.service";
import {FormsModule} from "@angular/forms";
import {AuthGuardService} from "./auth/auth-guard.service";
import {CoreModule} from "./core/core.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    SharedModule,
    AuthModule,
    FormsModule,
    CoreModule
  ],
  providers: [ShoppingListService, RecipeService, DatabaseService, AuthService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
