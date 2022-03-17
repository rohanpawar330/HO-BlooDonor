import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from './guard/auth-guard.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'phone-auth',
    pathMatch: 'full'
  },
  {
    path: 'phone-auth',
    loadChildren: () => import('./pages/phone-auth/phone-auth.module').then(m => m.PhoneAuthPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule),
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'img-upload',
    loadChildren: () => import('./pages/img-upload/img-upload.module').then(m => m.ImgUploadPageModule)
  },
  {
    path: 'upload-donor-data',
    loadChildren: () => import('./pages/upload-donor-data/upload-donor-data.module').then(m => m.UploadDonorDataPageModule)
  },
  {
    path: 'add-admin-user',
    loadChildren: () => import('./pages/add-admin-user/add-admin-user.module').then(m => m.AddAdminUserPageModule)
  },
  {
    path: 'admin-details',
    loadChildren: () => import('./pages/admin-details/admin-details.module').then(m => m.AdminDetailsPageModule)

  },
  {
    path: 'about-us',
    loadChildren: () => import('./pages/about-us/about-us.module').then(m => m.AboutUsPageModule)
  },
  {
    path: 'about-techassembler',
    loadChildren: () => import('./pages/about-techassembler/about-techassembler.module').then( m => m.AboutTechassemblerPageModule)
  }



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
