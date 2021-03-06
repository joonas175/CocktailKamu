import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, tap, catchError} from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BASE_API_URL } from 'src/app/global-variables';
import { Ingredient } from 'src/app/entities/Ingredient';

@Component({
  selector: 'app-ingredient-selector',
  templateUrl: './ingredient-selector.component.html'
})

/**
 * Ingredient selector.
 * Used in mainscreen.
 * Emits event on ingredient selected.
 */
export class IngredientSelectorComponent implements OnInit {

  @Output() ingredientAdded: EventEmitter<Ingredient> = new EventEmitter();

  searching = false;
  searchFailed = false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200), // 200ms timeout after typing until search
      distinctUntilChanged(),
      tap(() => this.searching = true),
      switchMap(term => term.length < 2 ? [] : // Search term must have atleast 2 chars
        this.http.get(`${BASE_API_URL}/ingredient`, { params: new HttpParams().set('name', term) }).pipe(
          tap(() => this.searchFailed = false),
          catchError(() => {
            this.searchFailed = true;
            return of([]); // Return empty array on error
          }))
      ),
      tap(() => this.searching = false)
    )

  // Format searched objects to show only name instead of [Object object]
  formatter = (obj: any) => obj.name;

  // Set text to null after selecting ingredient
  inputFormatter = (obj: any) => null;

  // Called when an object is selected
  ingredientSelected(event: any) {
    console.log(event);

    this.ingredientAdded.emit(event.item);

  }

}


