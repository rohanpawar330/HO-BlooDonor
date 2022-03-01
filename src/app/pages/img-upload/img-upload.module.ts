import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImgUploadPageRoutingModule } from './img-upload-routing.module';

import { ImgUploadPage } from './img-upload.page';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImgUploadPageRoutingModule,HttpClientModule
  ],
  declarations: [ImgUploadPage]
})
export class ImgUploadPageModule {}
