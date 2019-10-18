import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild("nameInput", { static: false }) nameInput: ElementRef;
  @ViewChild("amountInput", { static: false }) amountInput: ElementRef;
  @Output("onAddIngredient") onAddIngredient = new EventEmitter<Ingredient>();
  constructor() { }

  ngOnInit() {
  }

  submitIngredient(event: Event) {
    event.preventDefault();
    this.onAddIngredient.emit(
      new Ingredient(
        this.nameInput.nativeElement.value, 
        this.amountInput.nativeElement.value
        )
      );
  }
  
}
