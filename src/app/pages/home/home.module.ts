import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { UpdateDeleteModal } from '../../modals/update-delete-modal/update-delete-modal.component';
import { AddDonorModal } from '../../modals/add-donor-modal/add-donor-modal.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { SharedComponentsModule } from 'src/app/sharedComponents/shared-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    SharedComponentsModule
  ],
  declarations: [HomePage, UpdateDeleteModal, AddDonorModal],
  providers: [DatePipe]
})
export class HomePageModule { }
