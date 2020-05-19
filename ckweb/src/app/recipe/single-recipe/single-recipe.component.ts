import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Drink } from 'src/app/entities/Drink';
import { BASE_API_URL } from 'src/app/global-variables';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/auth.service';


/**
 * Component to display a single recipe.
 */
@Component({
  selector: 'app-single-recipe',
  templateUrl: './single-recipe.component.html',
  providers: [NgbRatingConfig]
})
export class SingleRecipeComponent implements OnInit {

  // The drink / cocktail
  drink: Drink = null;

  // Rating
  currentRating = 0;

  /**
   * User is allowed to vote only if logged in, to disable voting multiple times on the same drink.
   * User id from google is needed.
   */
  allowVote = false;

  constructor(private route: ActivatedRoute, private http: HttpClient, private auth: AuthService) {
  }

  /**
   * Fetch the drink itself and the rating for it.
   * Id comes from url parameter /recipe/:id
   */
  ngOnInit(): void {
    this.route.paramMap.subscribe((value) => {
      const id = value.get('id');
      this.http.get<Drink>(`${BASE_API_URL}/recipe/${id}`).subscribe((drink) => {
        this.drink = drink;
        });

      this.http.get<any>(`${BASE_API_URL}/vote/${id}`).subscribe((resp) => {
        console.log(resp);
        this.currentRating = resp.avgvote ? resp.avgvote : 0;
        if (this.auth.authObj.value !== null && this.auth.authObj.value !== undefined) {
          this.allowVote = true;
        }
      });
    });
  }

  /**
   * Send new rating value to backend. Called when user clicks on stars.
   * @param value new rating value given by user
   */
  rateChange(value: any): void {
    if (this.allowVote && value > 0 && value <= 5) {
      this.http.put(`${BASE_API_URL}/vote/${this.drink.id}`, null, {params: new HttpParams().set('vote', value)}).subscribe((resp) => {
        console.log(resp);
      });
    }

  }

}
