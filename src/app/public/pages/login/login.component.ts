import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {TranslateModule} from "@ngx-translate/core";
import {MatButton} from "@angular/material/button";
import {CdkListbox} from "@angular/cdk/listbox";
import {Router} from "@angular/router";

@Component({
  selector: 'app-pages',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    TranslateModule,
    MatButton,
    CdkListbox
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  loginForm! : FormGroup

  constructor(private fb : FormBuilder, private router: Router){

  }

  ngOnInit(): void {

    this.loginForm = this.fb.group({
      email : ["", Validators.required],
      password : ["", Validators.required]
    })
  }

  onSubmit(): void {
  }

  registerPage() : void{
    this.router.navigate(['/register']);

  }

}
