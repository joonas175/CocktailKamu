import { Injectable } from '@angular/core';
import { BehaviorSubject, pipe } from 'rxjs';
import { Drink } from '../entities/Drink';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BASE_API_URL } from '../global-variables';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  results: BehaviorSubject<Drink[]> = new BehaviorSubject<Drink[]>([]);

  term: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) {
    this.term.pipe(debounceTime(400), distinctUntilChanged())
      .subscribe((value) => {
        http.get(`${BASE_API_URL}/recipe`, { params: new HttpParams().set('name', value) }).subscribe((recipes) => {
          console.log(recipes);
        })
      }
    );


  }
}
