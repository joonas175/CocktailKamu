import { Injectable, Inject } from '@angular/core';
import { Ingredient } from './entities/Ingredient';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BASE_API_URL } from './global-variables';
import { Drink } from './entities/Drink';
import { Subject, BehaviorSubject } from 'rxjs';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  ingredients: BehaviorSubject<Ingredient[]> = new BehaviorSubject<Ingredient[]>([]);

  availableDrinks: Subject<Drink[]> = new Subject<Drink[]>();

  constructor(private http: HttpClient, @Inject(LOCAL_STORAGE) private storage: StorageService) {
    this.ingredients.subscribe((value) => {
      this.updateAvailableDrinks(value);
    });

    const ingredients = storage.get('ck-saved-ingredients');
    if (ingredients) {
      this.ingredients.next(ingredients);
    }
  }

  addIngredient(ingredient: Ingredient): void {

    const newIngredients = this.ingredients.getValue();
    newIngredients.push(ingredient);
    this.ingredients.next(newIngredients);
    this.storage.set('ck-saved-ingredients', newIngredients);
  }

  removeIngredient(index: number): void {
    const newIngredients = this.ingredients.getValue();
    newIngredients.splice(index, 1);
    this.ingredients.next(newIngredients);
    this.storage.set('ck-saved-ingredients', newIngredients);
  }

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
