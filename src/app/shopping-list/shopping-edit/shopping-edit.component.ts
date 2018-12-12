import {Component, OnInit, ViewChild, ElementRef, OnDestroy} from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import {FormGroup, NgForm} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private shoppingListService: ShoppingListService) { }
  onSubmit(form: NgForm)
  {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if(this.editMode){
      this.shoppingListService.updateIngrident(this.editedItemIndex, newIngredient);
      this.editMode = false;
    }
    else{
      this.shoppingListService.addIngredient(newIngredient);
    }
    this.slForm.resetForm();

  }
  ngOnInit() {
    this.subscription = this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editedItemIndex = index;
        this.editedItem = this.shoppingListService.getIngredient(index);
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });

      }
    );
  }

  onClear() {
    this.slForm.resetForm();
    this.editMode = false;
  }

  onDelete(index: number) {
    this.shoppingListService.deleteIngridient(this.editedItemIndex);
    this.onClear();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
