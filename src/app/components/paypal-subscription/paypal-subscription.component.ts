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
  selector: 'paypal-subscription',
  imports: [],
  templateUrl: './paypal-subscription.component.html',
  styleUrl: './paypal-subscription.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaypalSubscriptionComponent implements AfterViewInit {
  private readonly paypalService = inject(PaypalService);

  public amount = input.required<number | null>();
  private paypal!: PayPalNamespace | null;

  ngAfterViewInit(): void {
    this.setPaypalButtons();
  }

  async setPaypalButtons() {
    try {
      this.paypal = await loadScript({
        clientId: environment.paypalClientId,
        vault: true,
        intent: 'subscription',
      });
    } catch (error) {
      console.error('Failed to load the PayPal JS SDK script', error);
    }

    if (this.paypal) {
      try {
        await this.paypal.Buttons!({
          // fundingSource: 'paypal',
          style: {
            label: 'donate',
          },

          createSubscription: async (data, actions) => {
            const planId = await firstValueFrom(
              this.paypalService.createPlan({
                amount: this.amount()!,
                currency: 'USD',
              })
            );
            return actions.subscription.create({
              plan_id: planId,
            });
          },

          onApprove: async (data, actions) => {
            console.log(data);
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
