import { Injectable, Inject } from '@angular/core';
import { Ingredient } from './entities/Ingredient';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BASE_API_URL } from './global-variables';
import { Drink } from './entities/Drink';
import { Subject, BehaviorSubject } from 'rxjs';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

/**
 * Handles user related data (no authorization related), which in this case
 * means owned ingredients and available drinks.
 */
@Injectable({
  providedIn: 'root'
})
export class UserService {

  ingredients: BehaviorSubject<Ingredient[]> = new BehaviorSubject<Ingredient[]>([]);

  availableDrinks: BehaviorSubject<Drink[]> = new BehaviorSubject<Drink[]>([]);

  constructor(private http: HttpClient, @Inject(LOCAL_STORAGE) private storage: StorageService) {
    // When users ingredients change, update available drinks
    this.ingredients.subscribe((value) => {
      this.updateAvailableDrinks(value);
    });
    // Get saved ingredients
    const ingredients = storage.get('ck-saved-ingredients');
    if (ingredients) {
      this.ingredients.next(ingredients);
    }
  }

  /**
   * Add ingredient, and save ingredients to web storage
   * @param ingredient ingredient
   */
  addIngredient(ingredient: Ingredient): void {

    const newIngredients = this.ingredients.getValue();
    newIngredients.push(ingredient);
    this.ingredients.next(newIngredients);
    this.storage.set('ck-saved-ingredients', newIngredients);
  }

  /**
   * Remove ingredient from owned ingredients
   * @param index index of item to remove
   */
  removeIngredient(index: number): void {
    const newIngredients = this.ingredients.getValue();
    newIngredients.splice(index, 1);
    this.ingredients.next(newIngredients);
    this.storage.set('ck-saved-ingredients', newIngredients);
  }

  /**
   * Update available drinks from backend
   * @param ingredients Ingredients owned
   */
  updateAvailableDrinks(ingredients: Ingredient[]): void {
    if (ingredients.length === 0) {
      this.availableDrinks.next([]);
      return;
    }

    this.http.get<Drink[]>(
      `${BASE_API_URL}/recipe`,
      { params: new HttpParams().set('id_array', JSON.stringify(ingredients.map((value) => value.id)))}
    ).subscribe((value) => {
      console.log(value);
      this.availableDrinks.next(value);
    });
  }
}
