// services/companies.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Company } from '../models/company.model';
import { PaginatedResponse } from '../models/pagination.model';
import { environment } from '../../../environments/environment';

export interface CompaniesQuery {
  search?: string;
  page?: number;
  limit?: number;
}

@Injectable({ providedIn: 'root' })
export class CompaniesService {
  private readonly base = `${environment.baseURL}/companies`;

  constructor(private http: HttpClient) {}

  getAll(query: CompaniesQuery = {}): Observable<PaginatedResponse<Company>> {
    let params = new HttpParams();
    if (query.search) params = params.set('search', query.search);
    if (query.page) params = params.set('page', query.page);
    if (query.limit) params = params.set('limit', query.limit);
    return this.http.get<PaginatedResponse<Company>>(this.base, { params });
  }

  getById(id: number): Observable<Company> {
    return this.http.get<Company>(`${this.base}/${id}`);
  }
}
