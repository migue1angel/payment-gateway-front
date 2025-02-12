import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { PrimeIcons } from 'primeng/api';
import { combineLatest, merge } from 'rxjs';

@Component({
  selector: 'app-donation',
  standalone: false,
  templateUrl: './donation.component.html',
  styleUrl: './donation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DonationComponent {
  protected readonly PrimeIcons = PrimeIcons;
  protected amountField = new FormControl<number>(3, [Validators.required]);
  protected currencyField = new FormControl<string>('USD', [
    Validators.required,
  ]);
  protected paymentOption = new FormControl<boolean>(true, [
    Validators.required,
  ]);

  protected currencies = [
    { label: 'USD', value: 'USD' },
    { label: 'EUR', value: 'EUR' },
    { label: 'GBP', value: 'GBP' },
    { label: 'CAD', value: 'CAD' },
    { label: 'AUD', value: 'AUD' },
    { label: 'JPY', value: 'JPY' },
    { label: 'NZD', value: 'NZD' },
    { label: 'CHF', value: 'CHF' },
    { label: 'HKD', value: 'HKD' },
    { label: 'SGD', value: 'SGD' },
  ];
}
