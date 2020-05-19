import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, Form, FormControl, FormArray } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, tap, catchError} from 'rxjs/operators';
import { BASE_API_URL } from 'src/app/global-variables';

/**
 * Page to add a cocktail recipe to database.
 */
@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html'
})
export class AddRecipeComponent implements OnInit {

  // Root form group for the recipe
  recipeForm: FormGroup;

  // FormArray for the steps included in making the cocktail
  steps: FormArray;

  // Ingredients included in the cocktail
  ingredients: FormArray;

  searching = false;
  searchFailed = false;


  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.createForms();

  }

  /**
   * Create initial forms
   *
   * Uses many nested forms to make the submit value same syntax as in backend.
   */
  createForms(): void {
    this.steps = new FormArray([this.fb.group({description: ['', Validators.required], step: 0})]);
    this.ingredients = new FormArray([this.fb.group({ingredient_id: ['', Validators.required], amount: '', amount_unit: ''})]);

    this.recipeForm = this.fb.group({
      name: ['', Validators.required],
      description: '',
      steps: this.steps,
      ingredients: this.ingredients
    });
  }

  ngOnInit(): void {
  }

  /**
   * Adds a new step row
   */
  addStep(): void {
    this.steps.push(this.fb.group({description: ['', Validators.required], step: this.steps.length}));
  }

  /**
   * Add a new ingredient row
   */
  addIngredient(): void {
    this.ingredients.push(this.fb.group({ingredient_id: ['', Validators.required], amount: '', amount_unit: ''}));
  }

  /**
   * Submits form
   */
  onClick(): void {
    console.log(this.recipeForm.value);

    this.http.put(`${BASE_API_URL}/recipe/`, this.recipeForm.value).subscribe((value) => {
      this.createForms();
      console.log(value);
    }, (error) => {
      console.log(error);
    });
  }

  /**
   * See ingredient-selector component
   */
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


  /**
   * Handles selecting and incredient for the recipe.
   * 
   * @param event selection event
   * @param index index of the ingredient row
   */
  ingredientSelected(event: any, index: number) {
    console.log(event);
    this.ingredients.at(index).get('ingredient_id').setValue(event.item.id);

    console.log(this.recipeForm.value);
  }

}
