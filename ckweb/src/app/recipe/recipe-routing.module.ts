import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { RecipesComponent } from './recipes/recipes.component';
import { SingleRecipeComponent } from './single-recipe/single-recipe.component';


const routes: Routes = [
  { path: 'recipe/add', component: AddRecipeComponent },
  { path: 'recipes', component: RecipesComponent },
  { path: 'recipe/:id', component: SingleRecipeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipeRoutingModule { }
