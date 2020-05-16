import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeRoutingModule } from './recipe-routing.module';
import { RecipesComponent } from './recipes/recipes.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [RecipesComponent],
  imports: [
    CommonModule,
    RecipeRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class RecipeModule { }
