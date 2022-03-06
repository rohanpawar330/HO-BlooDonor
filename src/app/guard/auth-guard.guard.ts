import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UtilityService } from '../common-utilities/utility.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  isLoggedIn: any;
  constructor(private utility: UtilityService, private router: Router) { }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.utility._getStorage('user').then(data => {
      if (data.value) {
        return true
      } else {
        this.router.navigateByUrl('/')
        return false
      }
    }).catch(err => {
      return false
    })

  }

}
