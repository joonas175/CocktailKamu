import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, Form, FormControl, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { BASE_API_URL } from '../global-variables';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent implements OnInit {


  recipeForm: FormGroup;
  steps: FormArray;


  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.steps = new FormArray([new FormControl('', Validators.required)]);

    this.recipeForm = fb.group({
      name: ['', Validators.required],
      description: '',
      steps: this.steps
    });

  }

  ngOnInit(): void {

  }

  addStep(): void {
    this.steps.push(new FormControl('', Validators.required));
  }

  onClick(): void {
    console.log(this.recipeForm.value);
    this.http.put(`${BASE_API_URL}/recipe/`, this.recipeForm.value).subscribe((value) => {
      console.log(value);
    }, (error) => {
      console.log(error);
    });
  }

}
