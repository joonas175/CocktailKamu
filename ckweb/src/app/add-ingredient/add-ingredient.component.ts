import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { BASE_API_URL } from '../global-variables';

@Component({
  selector: 'app-add-ingredient',
  templateUrl: './add-ingredient.component.html'
})
export class AddIngredientComponent implements OnInit {

  ingredientForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.ingredientForm = fb.group({
      name: ['', Validators.required],
      description: ''
    });
  }

  ngOnInit(): void {
  }

  onClick(): void {
    /**
     * On submit, send values from form to backend.
     * Reset fields, so user can submit new ingredient right after.
     */
    this.http.put(`${BASE_API_URL}/ingredient/`, this.ingredientForm.value).subscribe((value) => {
      console.log(value);
      this.ingredientForm.setValue({name: '', description: ''});
    }, (error) => {
      console.log(error);
    });
  }

}
