import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { isSubmittingSelector } from '../../store/selectors';
import { registerAction } from '../../store/actions/register.action';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterRequestInterface } from '../../types/registerRequest.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  isSubmitting$!: Observable<boolean>;

  constructor(private formBuilder: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.initializeForm();
    this.initializeValues();
  }

  initializeForm(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  initializeValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
  }

  showFormErrors(field: string): string | void {
    const targetField = this.registerForm.get(field);
    if (targetField?.touched && !targetField.valid) {
      if (targetField.errors?.['email']) {
        return 'Email is invalid';
      }
      if (targetField.errors?.['required']) {
        return field[0].toUpperCase() + field.slice(1) + ' is required';
      }
      if (targetField.errors?.['minlength'] && field === 'username') {
        return 'Username must atleast have 4 characters';
      }
      if (targetField.errors?.['minlength'] && field === 'password') {
        return 'Password must atleast have 8 characters';
      }
    }
  }

  onSubmit(): void {
    if (this.registerForm.invalid) return;
    const request: RegisterRequestInterface = {
      user: this.registerForm.value,
    };
    this.store.dispatch(registerAction({ request }));
    this.registerForm.reset();
  }
}
