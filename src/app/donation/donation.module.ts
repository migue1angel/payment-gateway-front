import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DonationRoutingModule } from './donation-routing.module';
import { PaypalOrderComponent } from './paypal-order/paypal-order.component';
import { PaypalSubscriptionComponent } from './paypal-subscription/paypal-subscription.component';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ReactiveFormsModule } from '@angular/forms';
import { DonationComponent } from './donation.component';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputNumberModule } from 'primeng/inputnumber';

@NgModule({
  declarations: [DonationComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DonationRoutingModule,
    PaypalOrderComponent,
    PaypalSubscriptionComponent,
    SelectButtonModule,
    IconFieldModule,
    InputIconModule,
    InputNumberModule
  ],
})
export class DonationModule {}
