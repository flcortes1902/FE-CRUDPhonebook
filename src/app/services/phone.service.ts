import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';
import { Contact } from '../interfaces/contact';


@Injectable({
  providedIn: 'root'
})
export class PhoneService {

  private myAppUrl: string = environment.endpoint;
  private myApiUrl: string = 'api/Phonebook/';

  constructor(private http: HttpClient) { }

  getPhoneBook(): Observable<Contact[]> {
    return this.http.get<Contact[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  getOneContact(id: number): Observable<Contact> {
    return this.http.get<Contact>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  deleteContact(id: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  addContact(Contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(`${this.myAppUrl}${this.myApiUrl}`, Contact);
  }

  updateContact(id: number, Contact: Contact): Observable<void> {
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id}`, Contact);
  }
}


