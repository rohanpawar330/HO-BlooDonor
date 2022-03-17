import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddAdminUserPage } from './add-admin-user.page';

const routes: Routes = [
  {
    path: '',
    component: AddAdminUserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddAdminUserPageRoutingModule {}
