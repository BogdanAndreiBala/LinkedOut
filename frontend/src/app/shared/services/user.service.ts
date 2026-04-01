// services/users.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { PaginatedResponse } from '../models/pagination.model';
import { environment } from '../../../environments/environment';

export interface UsersQuery {
  search?: string;
  sort?: string;
  order?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

@Injectable({ providedIn: 'root' })
export class UsersService {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.baseURL}/users`;

  getAllUsers(query: UsersQuery = {}): Observable<PaginatedResponse<User>> {
    let params = new HttpParams();
    if (query.search) params = params.set('search', query.search);
    if (query.sort) params = params.set('sort', query.sort);
    if (query.order) params = params.set('order', query.order);
    if (query.page) params = params.set('page', query.page);
    if (query.limit) params = params.set('limit', query.limit);
    return this.http.get<PaginatedResponse<User>>(this.base, { params });
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.base}/${id}`);
  }

  updateUser(id: number, payload: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.base}/${id}`, payload);
  }
}
