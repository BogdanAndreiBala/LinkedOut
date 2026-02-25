import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly baseURL = environment.baseURL;
  private readonly usersURL = `${this.baseURL}/users`;

  private readonly httpClient: HttpClient = inject(HttpClient);

  /**
   * Fetches all users from the API.
   * @private
   * @returns An observable of user array
   */
  private getUsersRaw(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.usersURL);
  }

  /**
   * Retrieves all users.
   * @returns An observable of all users
   */
  public allUsers(): Observable<User[]> {
    return this.getUsersRaw();
  }

  /**
   * Retrieves a specific user by their ID.
   * @param id - The ID of the user to retrieve
   * @returns An observable of the user
   */
  public getUserById(id: number): Observable<User> {
    const url = `${this.usersURL}/${id}`;
    return this.httpClient.get<User>(url);
  }

  /**
   * Updates an existing user.
   * @param updated - The user object with updated information
   * @returns An observable of the updated user
   */
  public updateUser(updated: User): Observable<User> {
    return this.httpClient.put<User>(`${this.usersURL}/${updated.id}`, updated);
  }

  /** Return the "current" logged-in user (first user for demo purposes). */
  public currentUser(): Observable<User> {
    return this.getUserById(1);
  }
}
