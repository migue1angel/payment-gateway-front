import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { loadScript, PayPalNamespace } from '@paypal/paypal-js';
import { firstValueFrom } from 'rxjs';
import { PaypalService } from '../../services/paypal.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'paypal-order',
  imports: [],
  templateUrl: './paypal-order.component.html',
  styleUrl: './paypal-order.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaypalOrderComponent implements AfterViewInit {
  private readonly paypalService = inject(PaypalService);

  public amount = input.required<number|null>();
  private paypal!: PayPalNamespace | null;

  ngAfterViewInit(): void {
    this.setPaypalButtons();
  }

  async setPaypalButtons() {
    try {
      this.paypal = await loadScript({
        clientId: environment.paypalClientId,
        intent: 'capture',
      });
    } catch (error) {
      console.error('Failed to load the PayPal JS SDK script', error);
    }

    if (this.paypal) {
      try {
        await this.paypal.Buttons!({
          style: {
            label: 'donate',
          },

          createOrder: async () => {
            const orderId = await firstValueFrom(
              this.paypalService.createOrder(this.amount()!)
            );
            return orderId;
          },

          onApprove: async (data, actions) => {
            const response = await firstValueFrom(
              this.paypalService.capturePayment(data.orderID)
            );
            console.log('On approve, redireccionar a la página de donaciones');
          },
          onCancel: async (data, actions) => {
            console.log(data, 'order cancelled');
          },
          onError: (data) => {
            console.log('OnError', data);
          },
        }).render('#paypal-button-container');
      } catch (error) {
        console.error('failed to render the PayPal Buttons', error);
      }
    }
  }
}
