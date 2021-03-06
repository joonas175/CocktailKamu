import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddIngredientComponent } from './add-ingredient/add-ingredient.component';
import { MainPageComponent } from './mainpage/main-page/main-page.component';
import { AddRecipeComponent } from './recipe/add-recipe/add-recipe.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  { path: 'home', component: MainPageComponent},
  { path: 'ingredients/add', component: AddIngredientComponent},
  { path: 'login', component: LoginComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
