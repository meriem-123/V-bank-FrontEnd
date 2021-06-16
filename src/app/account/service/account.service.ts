import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account } from '../model/account';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private accountUrl: string;
  constructor(private http: HttpClient) {
    this.accountUrl = 'http://localhost:8081/compte';
  }

  public findAccountNum(id: string): Observable<Account> {
    return this.http.get<Account>(this.accountUrl + '/' + id);
  }
  public findAccountId(id: string): Observable<Account[]> {
    return this.http.get<Account[]>(this.accountUrl + 's?id=' + id);
  }
}
