import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../services/loginServices/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',  
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  loginForm: FormGroup;
  showToast: boolean = false;
  toastMessage: string = '';
  toastType: 'success' | 'error' = 'success';
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Formulario válido:', this.loginForm.value);
      this.loginService.login(this.loginForm.value).subscribe({
        next: (response) => {
          this.loginService.setSession(response);
          
        },
        error: (err) => {
          this.error = 'Credenciales inválidas';
          console.error('Error de login:', err);
        }
      });
    }
  }


}
