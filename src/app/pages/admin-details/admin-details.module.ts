import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminDetailsPageRoutingModule } from './admin-details-routing.module';

import { AdminDetailsPage } from './admin-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminDetailsPageRoutingModule
  ],
  declarations: [AdminDetailsPage]
})
export class AdminDetailsPageModule {}
