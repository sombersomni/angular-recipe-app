import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe(
      'A Test Recipe',
      'This is simply a test',
      'https://www.jessicagavin.com/wp-content/uploads/2019/08/chicken-alfredo-8-1200.jpg'
    )
  ];
  @Output() onSendRecipe = new EventEmitter<Recipe>();
  constructor() { }

  ngOnInit() {
  }

  selectRecipe(recipe: Recipe) {
    this.onSendRecipe.emit(recipe);
  }
}
