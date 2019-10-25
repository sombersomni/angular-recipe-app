import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  providers: []
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[] = [];
  currentItemIndex: number;
  constructor(private shoppingService: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.shoppingService.getIngredients();
    this.shoppingService.onIngredientsChange.subscribe((ingredients: Ingredient[]) => {
      this.ingredients = ingredients;
    })
  }

  onEditItem(index: number) {
    this.currentItemIndex = index;
    this.shoppingService.onShopItemEdit.next(index);
  }

  ngOnDestroy() {
    console.log("Shopping list is unreachable");
  }
}
