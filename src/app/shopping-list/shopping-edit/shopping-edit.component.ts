import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { FormGroup, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy{
  // @ViewChild("nameInput", { static: false }) nameInput: ElementRef;
  // @ViewChild("amountInput", { static: false }) amountInput: ElementRef;
  @ViewChild("shoppingListForm",  { static: true }) shoppingListForm: NgForm;
  itemEditSub$ : Subscription;
  editMode: boolean = false;
  editedItemIndex: number;
  editedItem: Ingredient;
  constructor(private shoppingService: ShoppingListService) { }

  ngOnInit() {
    console.log(this.shoppingListForm);
    this.itemEditSub$ = this.shoppingService.onShopItemEdit.subscribe((index: number) => {
      this.editedItemIndex = index;
      this.editMode = true;
      this.editedItem = this.shoppingService.getIngredient(index);
      this.shoppingListForm.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount
      })
    })
  }

  ngOnDestroy() {
    this.itemEditSub$.unsubscribe();
  }

  onClear() {
    this.shoppingListForm.reset();
    this.editMode = false;
  }
  
  onDelete() {
    this.shoppingService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }

  submitIngredient(event: Event) {

    const ingredient =  new Ingredient(
      this.shoppingListForm.value.name,
      this.shoppingListForm.value.amount
    );

    if(this.editMode) {
      this.shoppingService.updateIngredient(this.editedItemIndex, ingredient);
    } else {
      this.shoppingService.setIngredient(ingredient);
    }

    this.onClear();
  }

}
