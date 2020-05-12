import { Component, OnInit } from '@angular/core';
import { Ingredient } from 'src/app/entities/Ingredient';
import { UserService } from 'src/app/user-service.service';
import { Drink } from 'src/app/entities/Drink';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  ingredients: Ingredient[];
  drinks: Drink[];

  constructor(private userService: UserService) {
    this.userService.ingredients.subscribe((value) => {
      this.ingredients = value;
    });
    this.userService.availableDrinks.subscribe((value) => {
      this.drinks = value;
    });
  }

  ngOnInit(): void {
  }

  onIngredientAdded(ingredient: Ingredient): void {
    this.userService.addIngredient(ingredient);
  }

  removeIngredient(event: MouseEvent, index: number): void {
    this.userService.removeIngredient(index);
    event.preventDefault();
  }

  panelChange(event): void {
    console.log(event);
  }

}
