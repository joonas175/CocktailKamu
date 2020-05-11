import { Component, OnInit } from '@angular/core';
import { Ingredient } from 'src/app/entities/Ingredient';
import { UserService } from 'src/app/user-service.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  ingredients: Ingredient[] = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.ingredients = this.userService.ingredients;
  }

  onIngredientAdded(ingredient: Ingredient): void {
    this.userService.addIngredient(ingredient);
  }

  removeIngredient(event: MouseEvent, index: number): void {
    this.userService.removeIngredient(index);
    event.preventDefault();
  }

}
