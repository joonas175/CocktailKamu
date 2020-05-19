import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Drink } from 'src/app/entities/Drink';
import { BASE_API_URL } from 'src/app/global-variables';

@Component({
  selector: 'app-single-recipe',
  templateUrl: './single-recipe.component.html'
})
export class SingleRecipeComponent implements OnInit {

  drink: Drink;

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((value) => {
      const id = value.get('id');
      this.http.get<Drink>(`${BASE_API_URL}/recipe/${id}`).subscribe((drink) => {
        this.drink = drink;
        });
    });
  }

}
