import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilityService } from 'src/app/common-utilities/utility.service';
import { AuthUserService } from 'src/app/services/auth-user.service';

@Component({
  selector: 'app-phone-auth',
  templateUrl: './phone-auth.page.html',
  styleUrls: ['./phone-auth.page.scss'],
})
export class PhoneAuthPage implements OnInit {
  phoneNumber: string;
  constructor(private authService: AuthUserService, private utility: UtilityService, private router: Router) {
  }

  ngOnInit() {
  }

  authenticateUser() {
    this.utility._showLoader();
    var phNo = parseInt((<HTMLInputElement>document.getElementById("phoneNumber")).value);
    this.authService._authUser(phNo).subscribe(data => {
      console.log(data);
      this.utility._hideLoader();
      if (data.length > 0) {
        if (data[0].mobileNo == phNo) {
          this.utility._setStorage({ key: 'admin', value: { mobileNo: data[0].mobileNo, adminName: data[0].name } });
          this.router.navigate(['/home'])
        }
      } else {
        this.utility._errorAlert("You're not the Admin", 'Invalid credentials!');
      }

    }, err => {
      this.utility._hideLoader();
      this.utility._errorAlert("You're not the Admin", 'Invalid credentials!');
    })
    //     firebase.auth().signInWithPhoneNumber(phNo, this.recaptchaVerifier).then(result => {
    //  this.phoneNumber = phNo;
    //  this.otpSent = true;
    //  this.confirmationResult = result;
    //  }).catch(err => {
    //  alert(err);
    //  })
  }
}
