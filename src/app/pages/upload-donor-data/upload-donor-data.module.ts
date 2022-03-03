import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UploadDonorDataPageRoutingModule } from './upload-donor-data-routing.module';
import { UploadDonorDataPage } from './upload-donor-data.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UploadDonorDataPageRoutingModule
  ],
  declarations: [
 
  ]
})
export class UploadDonorDataPageModule {}
