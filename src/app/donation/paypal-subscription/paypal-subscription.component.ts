import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnInit,
} from '@angular/core';
import { loadScript, PayPalNamespace } from '@paypal/paypal-js';
import { firstValueFrom } from 'rxjs';
import { PaypalService } from '../../services/paypal.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'paypal-subscription',
  standalone: false,
  templateUrl: './paypal-subscription.component.html',
  styleUrl: './paypal-subscription.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaypalSubscriptionComponent implements OnInit {
  private readonly paypalService = inject(PaypalService);
  public currency = input.required<string | null>();
  public amount = input.required<number | null>();
  private paypal!: PayPalNamespace | null;

  ngOnInit(): void {
    this.setPaypalButtons();
  }

  async setPaypalButtons() {
    try {
      this.paypal = await loadScript({
        clientId: environment.paypalClientId,
        vault: true,
        intent: 'subscription',
        currency: this.currency()!,
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
                currency: this.currency()!,
              })
            );
            return actions.subscription.create({
              plan_id: planId,
            });
          },

          onApprove: async (data, actions) => {
            console.log(data);
            if (data.subscriptionID) {
              const response = await firstValueFrom(
                this.paypalService.captureSubscription(data.subscriptionID)
              );
              console.log(response);
            }
            console.log('On approve, redireccionar a la página de donaciones');
          },
          onCancel: (data, actions) => {
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
