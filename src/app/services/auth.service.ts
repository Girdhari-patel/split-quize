import { Injectable } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, UserCredential } from '@angular/fire/auth';
import { signInWithPopup } from '@firebase/auth';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
 
  constructor(private auth:Auth) { }
  login(email: string, password: string): Observable<any> {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }
  logout(): Observable<any> {
    return from(this.auth.signOut());
  }
  signUp(email: string, password: string):Observable<UserCredential> {
    return from(createUserWithEmailAndPassword(this.auth, email, password));
  }
  // Sign in with Google
  loginWithGoogle() {
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }
   
}
