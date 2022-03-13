import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddAdminUserPageRoutingModule } from './add-admin-user-routing.module';

import { AddAdminUserPage } from './add-admin-user.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddAdminUserPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AddAdminUserPage]
})
export class AddAdminUserPageModule {}
