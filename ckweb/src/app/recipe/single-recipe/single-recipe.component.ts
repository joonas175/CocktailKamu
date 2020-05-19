import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Drink } from 'src/app/entities/Drink';
import { BASE_API_URL } from 'src/app/global-variables';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-single-recipe',
  templateUrl: './single-recipe.component.html',
  providers: [NgbRatingConfig]
})
export class SingleRecipeComponent implements OnInit {

  drink: Drink = null;

  currentRating = 0;
  allowVote = true;

  constructor(private route: ActivatedRoute, private http: HttpClient) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((value) => {
      const id = value.get('id');
      this.http.get<Drink>(`${BASE_API_URL}/recipe/${id}`).subscribe((drink) => {
        this.drink = drink;
        });
    });
  }

  rateChange(value: any): void {
    if (this.allowVote) {
      console.log(value);
    }

  }

}
