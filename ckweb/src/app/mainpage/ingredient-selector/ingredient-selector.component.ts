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
export class IngredientSelectorComponent implements OnInit {

  @Output() ingredientAdded: EventEmitter<Ingredient> = new EventEmitter();

  searching = false;
  searchFailed = false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
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

  inputFormatter = (obj: any) => null;


  ingredientSelected(event: any) {
    console.log(event);

    this.ingredientAdded.emit(event.item);

  }

}


