import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { RecipesComponent } from './recipes/recipes.component';


const routes: Routes = [
  { path: 'recipe/add', component: AddRecipeComponent },
  { path: 'recipes', component: RecipesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipeRoutingModule { }
