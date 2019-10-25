import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, AbstractControl, Validators } from '@angular/forms';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})

export class RecipeEditComponent implements OnInit {
  isCreate: boolean;
  recipeForm: FormGroup;
  recipeId: number;
  constructor(
    private route: ActivatedRoute, 
    private recipeService: RecipeService,
    private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.isCreate = !params.id;
      this.recipeId = params.id;
      this.initForm(+params.id);
    })
  }

  private initForm(id: number) {
    const recipe: Recipe = this.recipeService.getRecipe(id);
    console.log(recipe);
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipe ? recipe.name : '', Validators.required),
      'desc': new FormControl(recipe ? recipe.desc : '', Validators.required),
      'img': new FormControl(recipe ? recipe.img : '', Validators.required),
      'ingredients': recipe ? new FormArray(
        recipe.ingredients.map(
          ingredient => new FormGroup({
            'name': new FormControl(ingredient.name, Validators.required),
            'amount': new FormControl(
              ingredient.amount, 
              [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
          })
        )
      ) : new FormArray([])
    })
    console.log(this.recipeForm)
  }

  controls() : AbstractControl[] {
    const ingredientArray: FormArray = this.recipeForm.get("ingredients") as FormArray;
    return ingredientArray.controls;
  }

  onSubmit() {
    const {name, desc, img, ingredients} = this.recipeForm.value;
    const recipe: Recipe = new Recipe(name, desc, img, ingredients)
    if(!this.isCreate) {
      this.recipeService.updateRecipe(recipe, this.recipeId);
    } else {
      this.recipeService.addRecipe(recipe);
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(["/recipes", this.isCreate ? '' : this.recipeId])
  }

  onAddIngredient() {
    console.log("adding ingredients", this.recipeId);
    (this.recipeForm.get("ingredients") as FormArray).push(new FormGroup({
      'name': new FormControl(null,  Validators.required),
      'amount': new FormControl(null,  [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    }))
  }

  onRemoveIngredient(index: number) {
    (this.recipeForm.get("ingredients") as FormArray).removeAt(index);
  }

}
