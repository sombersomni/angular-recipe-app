import { Ingredient } from '../shared/ingredient.model';

export class Recipe {
    public name: string;
    public desc: string;
    public img: string;
    public ingredients?: Ingredient[];
    constructor(name: string, desc: string, img: string, ingredients: Ingredient[]) {
        this.name = name;
        this.desc = desc;
        this.img = img;
        this.ingredients = ingredients;
    }
}