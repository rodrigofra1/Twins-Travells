import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TravelsListPage } from './travels-list.page';

const routes: Routes = [
  {
    path: '',
    component: TravelsListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TravelsListPageRoutingModule {}
