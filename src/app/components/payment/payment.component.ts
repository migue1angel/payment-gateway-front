import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { PaypalComponent } from '../paypal/paypal.component';
import { DividerModule } from 'primeng/divider';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TableModule } from 'primeng/table';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimeIcons } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { AccordionModule } from 'primeng/accordion';
import { InputNumberModule } from 'primeng/inputnumber';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
@Component({
  selector: 'app-payment',
  imports: [
    CommonModule,
    ButtonModule,
    PaypalComponent,
    DividerModule,
    ReactiveFormsModule,
    InputNumberModule,
    IconFieldModule,
    InputIconModule,
  ],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PaymentComponent {
  protected amountField = new FormControl(3, [Validators.required]);
  protected readonly PrimeIcons = PrimeIcons;
  paymentMethod!: string;
  onSelectPayment(paymentMethod: string) {
    this.paymentMethod = paymentMethod;
  }
}
