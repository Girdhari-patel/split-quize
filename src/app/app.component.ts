import { Component } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'split-quiz';
  currentUser$: Observable<any>;
  constructor(
    public authService: AuthService,
    private auth: Auth,
    private router: Router
  ) {
    this.currentUser$ = authState(this.auth);
  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/']);
    });
  }
signUp() {
    this.router.navigate(['/singup']);
  }

  
}
