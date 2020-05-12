import { Component, OnInit } from '@angular/core';
import { Ingredient } from 'src/app/entities/Ingredient';
import { UserService } from 'src/app/user-service.service';
import { Drink } from 'src/app/entities/Drink';
import { HttpClient } from '@angular/common/http';
import { BASE_API_URL } from 'src/app/global-variables';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  ingredients: Ingredient[];
  drinks: Drink[];

  fullDrinks: any = {};

  constructor(private userService: UserService, private http: HttpClient) {
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

  panelChange(event: any): void {
    const id = event.panelId.split('-')[1];

    if (!Object.keys(this.fullDrinks).find((value) => value === id)) {
      this.http.get<Drink>(`${BASE_API_URL}/recipe/${id}`).subscribe((value) => {
        this.fullDrinks[`${id}`] = value;
        });
    }
  }

}
