import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonDatetime, ModalController, PopoverController } from '@ionic/angular';
import { DonorService } from '../../services/donor.service';
import { UserDetailsI } from '../../interface/interface';
import { USER_DETAIL } from '../../common-utilities/constant';
import moment from 'moment';
import { UtilityService } from 'src/app/common-utilities/utility.service';

@Component({
  selector: 'app-add-donor',
  templateUrl: './add-donor-modal.component.html',
  styleUrls: ['./add-donor-modal.component.scss'],
})
export class AddDonorModal implements OnInit {

  @ViewChild('datePicker', { static: false }) datePicker: IonDatetime;
  @ViewChild('datePopOver', { static: false }) datePopOver: PopoverController;

  userDetail: UserDetailsI = USER_DETAIL;
  donorForm: FormGroup;
  isSubmitted: boolean;
  titleAlert: string = 'This field is required';
  post: any = '';
  phoneRegex: RegExp = /^((\\+91-?)|0)?[0-9]{10}$/;
  todayDate: any = new Date();
  date = this.todayDate.toISOString();


  constructor(private utility: UtilityService, private formBuilder: FormBuilder, private donorService: DonorService, private router: Router, private modalCtrl: ModalController) { }



  ngOnInit() {
    this.createDonorForm();
  }

  createDonorForm() {
    this.donorForm = this.formBuilder.group({
      firstName: new FormControl('', Validators.required),
      lastName: ["", [Validators.required, Validators.pattern("^[a-zA-Z]*$")]],
      gender: new FormControl('', Validators.required),
      mobileNo: new FormControl('', Validators.compose([Validators.required, Validators.pattern(this.phoneRegex)])),
      age: new FormControl('', Validators.compose([Validators.required])),
      dateOfDonation: new FormControl(''),
      donationType: new FormControl(''),
      bloodGroup: new FormControl('', Validators.required),
      availableForDonation: new FormControl(''),
      address: this.formBuilder.group({
        city: new FormControl('', Validators.required),
        area: new FormControl('', Validators.required),
        state: new FormControl('', Validators.required),
        pincode: new FormControl('', Validators.required),
      })

    });
  }
  // submit() {
  //   console.log(this.donorForm.value);

  // }

  submit() {
    console.log(this.userDetail)
    this.utility._showLoader();
    this.donorService.addDonor({
      firstName: this.userDetail.firstName,
      lastName: this.userDetail.lastName,
      mobileNo: this.userDetail.mobileNo,
      gender: this.userDetail.gender,
      age: this.userDetail.age,
      donationType: this.userDetail.donationType,
      dateOfDonation: this.userDetail.dateOfDonation,
      bloodGroup: this.userDetail.bloodGroup,
      availableForDonation: this.userDetail.availableForDonation,
      address: {
        city: this.userDetail.address.city,
        area: this.userDetail.address.area,
        state: this.userDetail.address.state,
        pincode: this.userDetail.address.pincode,
      }
    }).then(() => {
      this.utility._hideLoader();
      this.router.navigate['home'];
    }).catch(() => {
      this.utility._hideLoader();
      this.utility._errorAlert();
    });;

    // console.log(form)
  }

  cancel() { this.router.navigate['home']; }

  _dismiss() {
    this.modalCtrl.dismiss({
      'fromModal': 'Subscribed TechAssembler'
    });
  }

  ionDateChange(event) {
    let date;
    if (date != event.detail.value) {
      date = event.detail.value;
      this.closeDatePicker();
    }

    // this.donorForm.patchValue({ dateofDonation: moment(event.detail.value).format('DD/MM/YYYY') })
  }

  closeDatePicker() {
    this.datePopOver.dismiss();
  }

  _bloodGroupSelected(bloodGroup) {
    this.userDetail.bloodGroup = bloodGroup;
  }
  _genderSelected(gender) {
    this.userDetail.gender = gender;
  }
  _donationType(donationType) {
    this.userDetail.donationType = donationType
  }
}
