import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Job } from '../models/job.model';
import { PaginatedResponse } from '../models/pagination.model';
import { environment } from '../../../environments/environment';

export interface JobsQuery {
  search?: string;
  page?: number;
  limit?: number;
}

@Injectable({ providedIn: 'root' })
export class JobsService {
  private readonly base = `${environment.baseURL}/jobs`;

  constructor(private http: HttpClient) {}

  getAll(query: JobsQuery = {}): Observable<PaginatedResponse<Job>> {
    let params = new HttpParams();
    if (query.search) params = params.set('search', query.search);
    if (query.page) params = params.set('page', query.page);
    if (query.limit) params = params.set('limit', query.limit);
    return this.http.get<PaginatedResponse<Job>>(this.base, { params });
  }

  getById(id: number): Observable<Job> {
    return this.http.get<Job>(`${this.base}/${id}`);
  }

  create(payload: Partial<Job>): Observable<Job> {
    return this.http.post<Job>(this.base, payload);
  }

  update(id: number, payload: Partial<Job>): Observable<Job> {
    return this.http.put<Job>(`${this.base}/${id}`, payload);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }
}
