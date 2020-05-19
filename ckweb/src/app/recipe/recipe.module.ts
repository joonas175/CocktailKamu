import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeRoutingModule } from './recipe-routing.module';
import { RecipesComponent } from './recipes/recipes.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SingleRecipeComponent } from './single-recipe/single-recipe.component';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [RecipesComponent, SingleRecipeComponent],
  imports: [
    CommonModule,
    RecipeRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbRatingModule
  ]
})
export class RecipeModule { }
