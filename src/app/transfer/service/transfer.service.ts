import { Injectable } from '@angular/core';
import { Transfer } from '../model/transfer';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TransferService {
  private transferUrl: string;
  constructor(private http: HttpClient) {
    this.transferUrl = 'http://localhost:8081/virement';
  }
  public findAll(code: string): Observable<Transfer[]> {
    return this.http.get<Transfer[]>(
      'http://localhost:8081/compte/' + code + '/virements'
    );
  }

  public save(transfer: Transfer) {
    return this.http.post<Transfer>(this.transferUrl + 's', transfer);
  }
  getPDF(invoiceId: number): Observable<Blob> {
    return this.http.get<Blob>(this.transferUrl + 'PDF/' + invoiceId, {
      responseType: 'blob' as 'json',
    });
  }
}
