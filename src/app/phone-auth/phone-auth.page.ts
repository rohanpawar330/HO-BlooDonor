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

  constructor() {
  }

  ngOnInit() {
    //  this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', { 'size': 'invisible' });
  }


  sendOTP() {
    var phNo = (<HTMLInputElement>document.getElementById("phoneNumber")).value;
    console.log(phNo)
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
