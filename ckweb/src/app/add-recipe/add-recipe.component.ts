import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, Form, FormControl, FormArray } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BASE_API_URL } from '../global-variables';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, tap, catchError} from 'rxjs/operators';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent implements OnInit {


  recipeForm: FormGroup;
  steps: FormArray;
  ingredients: FormArray;

  searching = false;
  searchFailed = false;


  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.steps = new FormArray([fb.group({description: ['', Validators.required], step: 0})]);
    this.ingredients = new FormArray([fb.group({ingredient_id: ['', Validators.required], amount: '', amount_unit: ''})]);

    this.recipeForm = fb.group({
      name: ['', Validators.required],
      description: '',
      steps: this.steps,
      ingredients: this.ingredients
    });

  }

  ngOnInit(): void {
  }

  addStep(): void {
    this.steps.push(this.fb.group({description: ['', Validators.required], step: this.steps.length}));
  }

  addIngredient(): void {
    this.ingredients.push(this.fb.group({ingredient_id: ['', Validators.required], amount: '', amount_unit: ''}));
  }

  onClick(): void {
    console.log(this.recipeForm.value);

    this.http.put(`${BASE_API_URL}/recipe/`, this.recipeForm.value).subscribe((value) => {
      console.log(value);
    }, (error) => {
      console.log(error);
    });
  }

  search = (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    tap(() => this.searching = true),
    switchMap(term => term.length < 2 ? [] :
      this.http.get(`${BASE_API_URL}/ingredient`, { params: new HttpParams().set('name', term) }).pipe(
        tap(() => this.searchFailed = false),
        catchError(() => {
          this.searchFailed = true;
          return of([]);
        }))
    ),
    tap(() => this.searching = false)
  )

  formatter = (obj: any) => obj.name;


  ingredientSelected(event: any, index: number) {
    console.log(event);
    this.ingredients.at(index).get('ingredient_id').setValue(event.item.id);

    console.log(this.recipeForm.value);
  }

}
