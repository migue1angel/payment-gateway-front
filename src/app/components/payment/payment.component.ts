import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { PaypalOrderComponent } from '../paypal-order/paypal-order.component';
import { DividerModule } from 'primeng/divider';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimeIcons } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { InputNumberModule } from 'primeng/inputnumber';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { SelectButtonModule } from 'primeng/selectbutton';
import { PaypalSubscriptionComponent } from '../paypal-subscription/paypal-subscription.component';

@Component({
  selector: 'app-payment',
  imports: [
    CommonModule,
    ButtonModule,
    PaypalOrderComponent,
    PaypalSubscriptionComponent,
    DividerModule,
    ReactiveFormsModule,
    InputNumberModule,
    IconFieldModule,
    InputIconModule,
    SelectButtonModule,
  ],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PaymentComponent {
  protected amountField = new FormControl<number>(3, [Validators.required]);
  protected paymentOption = new FormControl<boolean>(true, [
    Validators.required,
  ]);
  protected readonly PrimeIcons = PrimeIcons;
}
