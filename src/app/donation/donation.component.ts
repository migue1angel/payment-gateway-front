import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { PrimeIcons } from 'primeng/api';

@Component({
  selector: 'app-donation',
  standalone:false,
  templateUrl: './donation.component.html',
  styleUrl: './donation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DonationComponent {
  protected amountField = new FormControl<number>(3, [Validators.required]);
  protected paymentOption = new FormControl<boolean>(true, [
    Validators.required,
  ]);
  protected readonly PrimeIcons = PrimeIcons;

}
