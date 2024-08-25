import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/loginServices/login.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  user: any;
  userReg: boolean = false;
  constructor(
    private router: Router,
    private loginService: LoginService,
  ) { }
  ngOnInit(): void {
    this.loginService.getUser().subscribe(user => {
      this.user = user;
     
      if(this.user.rol == 'usuario regular'){
        this.userReg = true;
        
      }
      console.log('User info:', this.user);
    });
  }
  redirectTo(ruta:string) {
    this.router.navigate([ruta]); 
  }

} 
