import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CreatePaypalPlan } from '../models/create-paypal-plan.interface';

@Injectable({
  providedIn: 'root',
})
export class PaypalService {
  private readonly httpClient = inject(HttpClient);
  private readonly apiUrl = environment.baseApiUrl;

  createOrder(amount: number): Observable<string> {
    return this.httpClient
      .post<{ id: string }>(`${this.apiUrl}/payments/paypal/create`, { amount })
      .pipe(map((res) => res.id));
  }

  capturePayment(orderId: string): Observable<void> {
    console.log(orderId);

    return this.httpClient.get<void>(
      `${this.apiUrl}/payments/paypal/capture/${orderId}`
    );
  }

  createPlan(data:CreatePaypalPlan): Observable<string> {
    return this.httpClient
      .post<{ id: string }>(`${this.apiUrl}/payments/paypal/plan`, data)
      .pipe(map((res) => res.id));
  }
}
