import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../../environments/environment';

export interface JwtPayload {
  sub: number;
  email: string;
  iat: number;
  exp: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly store = inject(Store);
  private readonly baseUrl = `${environment.baseURL}/auth`;

  public login(credentials: LoginCredentials): Observable<{ accessToken: string }> {
    return this.http
      .post<{ accessToken: string }>(`${this.baseUrl}/login`, credentials)
      .pipe(tap((response) => this.persistToken(response.accessToken)));
  }

  public persistToken(token: string): void {
    sessionStorage.setItem('token', token);
    this.loadUserFromToken();
  }

  public loadUserFromToken(): void {
    const userId = this.getUserIdFromToken();
    if (userId) {
      this.store.dispatch({ type: '[Auth] Load Current User', userId });
    }
  }

  public getUserIdFromToken(): number | null {
    const token = this.getToken();
    if (!this.validateToken() || !token) {
      return null;
    }

    const decoded = jwtDecode<JwtPayload>(token);
    return decoded.sub;
  }

  public validateToken(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      const currentUnixTime = Math.floor(Date.now() / 1000);
      return decoded.exp > currentUnixTime;
    } catch (error) {
      return false;
    }
  }

  public getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  public register(userData: RegisterData): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/register`, userData);
  }

  public logout(): void {
    sessionStorage.removeItem('token');
    this.store.dispatch({ type: '[Auth] Logout' });
  }
}
