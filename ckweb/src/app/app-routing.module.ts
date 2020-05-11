import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddIngredientComponent } from './add-ingredient/add-ingredient.component';
import { MainPageComponent } from './mainpage/main-page/main-page.component';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';


const routes: Routes = [
  { path: 'home', component: MainPageComponent},
  { path: 'recipes/add', component: AddRecipeComponent},
  { path: 'ingredients/add', component: AddIngredientComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
