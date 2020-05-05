import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-ingredient',
  templateUrl: './add-ingredient.component.html',
  styleUrls: ['./add-ingredient.component.css']
})
export class AddIngredientComponent implements OnInit {

  ingredientForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.ingredientForm = fb.group({
      name: ['', Validators.required],
      description: ''
    });
  }

  ngOnInit(): void {
  
  }

  onClick(): void {
    console.log(this.ingredientForm.value);
    
  }

}
