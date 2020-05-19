import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Drink } from 'src/app/entities/Drink';
import { BASE_API_URL } from 'src/app/global-variables';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-single-recipe',
  templateUrl: './single-recipe.component.html',
  providers: [NgbRatingConfig]
})
export class SingleRecipeComponent implements OnInit {

  drink: Drink = null;

  currentRating = 0;
  allowVote = false;

  constructor(private route: ActivatedRoute, private http: HttpClient, private auth: AuthService) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((value) => {
      const id = value.get('id');
      this.http.get<Drink>(`${BASE_API_URL}/recipe/${id}`).subscribe((drink) => {
        this.drink = drink;
        });

      this.http.get<any>(`${BASE_API_URL}/vote/${id}`).subscribe((resp) => {
        this.currentRating = resp.avgvote;
        if (this.auth.authObj.value !== null && this.auth.authObj.value !== undefined) {
          this.allowVote = true;
        }
      });
    });
  }

  rateChange(value: any): void {
    if (this.allowVote) {
      this.http.put(`${BASE_API_URL}/vote/${this.drink.id}`, null, {params: new HttpParams().set('vote', value)}).subscribe((resp) => {
        console.log(resp);
      });
    }

  }

}
