import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.page').then(m => m.HomePage)
  },
  {
    path: 'travels-list',
    loadComponent: () => import('./pages/travels-list/travels-list.page').then(m => m.TravelsListPage)
  },
  {
    path: 'create-travel',
    loadComponent: () => import('./pages/create-travel/create-travel.page').then(m => m.CreateTravelPage)
  },
  {
    path: 'travel-detail/:id',
    loadComponent: () => import('./pages/travel-detail/travel-detail.page').then(m => m.TravelDetailPage)
  }
];
