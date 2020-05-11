import { Component, OnInit } from '@angular/core';
import { Ingredient } from 'src/app/entities/Ingredient';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  ingredients: Ingredient[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  onIngredientAdded(ingredient: Ingredient): void {
    this.ingredients.push(ingredient);
  }

  removeIngredient(event: MouseEvent, index: number): void {
    this.ingredients.splice(index, 1);
    event.preventDefault();
  }

}
