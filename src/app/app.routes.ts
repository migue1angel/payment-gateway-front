import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./donation/donation.module').then((m) => m.DonationModule),
  },
];
