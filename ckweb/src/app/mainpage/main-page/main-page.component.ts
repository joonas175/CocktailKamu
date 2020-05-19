import { Component, OnInit } from '@angular/core';
import { Ingredient } from 'src/app/entities/Ingredient';
import { UserService } from 'src/app/user-service.service';
import { Drink } from 'src/app/entities/Drink';
import { HttpClient } from '@angular/common/http';
import { BASE_API_URL } from 'src/app/global-variables';

/**
 * Frontpage (/home) of the app.
 * Shows an ingredient selection bar, selected ingredients, and a list of doable cocktails.
 */
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html'
})
export class MainPageComponent implements OnInit {

  ingredients: Ingredient[]; // Ingredients selected
  drinks: Drink[]; // Drinks available

  fullDrinks: any = {}; // Drinks including steps and ingredients, fetched when opening an accordion

  constructor(private userService: UserService, private http: HttpClient) {
    /**
     * Ingredients and drinks are handled and cached by userService.
     * Subscribe here to any changes.
     */
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

  /**
   * Fetch full cocktail information on accordion element open.
   * Why is it like this and not in an own component? To cache the response.
   * @param event emitted when opning an accordion
   */
  panelChange(event: any): void {
    const id = event.panelId.split('-')[1];

    if (!Object.keys(this.fullDrinks).find((value) => value === id)) {
      this.http.get<Drink>(`${BASE_API_URL}/recipe/${id}`).subscribe((value) => {
        this.fullDrinks[`${id}`] = value;
        });
    }
  }

}
