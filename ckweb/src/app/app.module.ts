import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddIngredientComponent } from './add-ingredient/add-ingredient.component';
import { MainPageComponent } from './mainpage/main-page/main-page.component';
import { AddRecipeComponent } from './recipe/add-recipe/add-recipe.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MainPageModule } from './mainpage/mainpage.module';
import { RecipeModule } from './recipe/recipe.module';
import { LoginComponent } from './login/login.component';
import { authInterceptorProviders } from './auth-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    AddIngredientComponent,
    AddRecipeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    MainPageModule,
    RecipeModule
  ],
  providers: [ authInterceptorProviders ],
  bootstrap: [AppComponent]
})
export class AppModule { }
