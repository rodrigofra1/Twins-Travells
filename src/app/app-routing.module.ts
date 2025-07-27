import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'nova-viagem',
    loadChildren: () => import('./pages/create-travel/create-travel.module').then(m => m.CreateTravelPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'nova-viagem',
    pathMatch: 'full'
  },
  {
    path: 'travels',
    loadChildren: () => import('./pages/travels/travels.module').then(m => m.TravelsPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
