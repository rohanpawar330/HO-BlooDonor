// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-phone-auth',
//   templateUrl: './phone-auth.page.html',
//   styleUrls: ['./phone-auth.page.scss'],
// })
// export class PhoneAuthPage implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilityService } from 'src/app/common-utilities/utility.service';
import { AuthUserService } from 'src/app/services/auth-user.service';
// import * as firebase from "firebase";

@Component({
  selector: 'app-phone-auth',
  templateUrl: './phone-auth.page.html',
  styleUrls: ['./phone-auth.page.scss'],
})
export class PhoneAuthPage implements OnInit {
  otpSent: boolean = false; //OTP sent status
  recaptchaVerifier;
  // confirmationResult: firebase.auth.ConfirmationResult;

  phoneNumber: string; //set value after OTP is sent

  constructor(private authService: AuthUserService, private utility: UtilityService, private router: Router) {
  }

  ngOnInit() {
    //  this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', { 'size': 'invisible' });
  }


  sendOTP() {
    var phNo = parseInt((<HTMLInputElement>document.getElementById("phoneNumber")).value);
    this.authService._authUser(phNo).subscribe(data => {
      console.log(data[0].mobileNo)
      if (data.length > 0) {
        if (data[0].mobileNo == phNo) {
          this.utility._setStorage({ key: 'user', value: data[0].mobileNo });
          this.router.navigate(['home'])
        }
      }

    })
    //     firebase.auth().signInWithPhoneNumber(phNo, this.recaptchaVerifier).then(result => {
    //  this.phoneNumber = phNo;
    //  this.otpSent = true;
    //  this.confirmationResult = result;
    //  }).catch(err => {
    //  alert(err);
    //  })
  }

  verifyOTP() {
    var otp = (<HTMLInputElement>document.getElementById("otp")).value;

    //  this.confirmationResult.confirm(otp).then((data) => {
    //  alert("Success"); 
    //  }).catch(err => {
    //  alert(err);
    //  })
  }
}
