import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { SearchService } from '../search.service';
import { Drink } from 'src/app/entities/Drink';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  searchBar: FormControl = new FormControl('');

  results: Drink[];

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {
    this.searchBar.valueChanges.subscribe((value) => {
      this.searchService.term.next(value);
    });

    this.results = this.searchService.results.value;
    this.searchBar.reset(this.searchService.term.value);

    this.searchService.results.subscribe((value) => {
      this.results = value;
    });
  }

}
