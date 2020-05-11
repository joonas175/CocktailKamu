import { Injectable } from '@angular/core';
import { Ingredient } from './entities/Ingredient';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BASE_API_URL } from './global-variables';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  ingredients: Ingredient[] = [];

  availableDrinks: any[] = [];

  constructor(private http: HttpClient) { }

  addIngredient(ingredient: Ingredient): void {
    this.ingredients.push(ingredient);
    this.updateAvailableDrinks();
  }

  removeIngredient(index: number): void {
    this.ingredients.splice(index, 1);
    this.updateAvailableDrinks();
  }

  updateAvailableDrinks(): void {
    this.http.get(
      `${BASE_API_URL}/recipe`,
      { params: new HttpParams().set('id_array', JSON.stringify(this.ingredients.map((value) => value.id)))}
    ).subscribe((value) => {
      console.log(value)
    });
  }
}
