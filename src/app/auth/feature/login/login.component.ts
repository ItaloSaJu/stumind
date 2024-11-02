import { NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { hasEmailError, isRequired } from 'src/app/utils/validators';
import { AuthService } from '../../auth-service/auth.service';
import { Router, RouterLink } from '@angular/router';

export interface FormLogin {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule, NgIf, RouterLink],
})
export class LoginComponent implements OnInit {
  private _fb = inject(FormBuilder);
  private _authService = inject(AuthService);
  private _router = inject(Router);

  constructor() {}

  isRequired(field: 'email' | 'password') {
    return isRequired(field, this.form);
  }

  hasEmailError() {
    return hasEmailError(this.form);
  }

  form = this._fb.group<FormLogin>({
    email: this._fb.control('', [Validators.required, Validators.email]),
    password: this._fb.control('', Validators.required),
  });

  ngOnInit() {}

  async submit() {
    if (this.form.invalid) return;

    try {
      const { email, password } = this.form.value;
      if (!email || !password) return;

      await this._authService.signIn({ email, password });
      console.log('logato');
      this._router.navigateByUrl('/home');
    } catch (error) {
      console.log(error);
    }
  }

  async submitWithGoogle() {
    try {
      await this._authService.signInGoogle();
      this._router.navigateByUrl('/home')
      console.log('logato');
    } catch (error) {
      console.log(error);
    }
  }
}
