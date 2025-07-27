import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { TravelsListPageRoutingModule } from './travels-list-routing.module';

import { TravelsListPage } from './travels-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TravelsListPageRoutingModule
  ],
  declarations: [TravelsListPage]
})
export class TravelsListPageModule {}
