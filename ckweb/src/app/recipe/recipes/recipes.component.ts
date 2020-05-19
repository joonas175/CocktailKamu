import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { SearchService } from '../search.service';
import { Drink } from 'src/app/entities/Drink';


/**
 * Page for recipe search.
 * @todo sorting
 */
@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html'
})
export class RecipesComponent implements OnInit {

  // Search bar
  searchBar: FormControl = new FormControl('');

  // Search results
  results: Drink[];

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {
    this.searchBar.valueChanges.subscribe((value) => {
      this.searchService.term.next(value); // Subscribe to searchbar value and update it to search service
    });

    // Get initial results if any (useful when navigating back and forth).
    this.results = this.searchService.results.value;

    // Get inital search bar value from search service.
    this.searchBar.reset(this.searchService.term.value);

    // Subscribe to results from search service
    this.searchService.results.subscribe((value) => {
      this.results = value;
    });
  }

}
