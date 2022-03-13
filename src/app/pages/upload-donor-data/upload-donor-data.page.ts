import { Component, OnInit } from '@angular/core';
import donorData from '../../../../uploadDonorDataToCloud/bloodDonorList.json';
import { DonorService } from '../../services/donor.service';
import { UserDetailsI } from '../../interface/interface';
import { UtilityService } from 'src/app/common-utilities/utility.service';

@Component({
  selector: 'app-upload-donor-data',
  templateUrl: './upload-donor-data.page.html',
  styleUrls: ['./upload-donor-data.page.scss'],
})
export class UploadDonorDataPage implements OnInit {

  constructor(private donorService: DonorService, private utility: UtilityService) { }

  ngOnInit() {
  }

  uploadData() {
    // this.utility._showLoader();
    donorData.forEach(userData => {
      // this.donorService.addDonor({
      let data = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        mobileNo: userData.mobileNo,
        gender: userData.gender,
        age: userData.age,
        dateOfDonation: this._manuplateDate(userData.dateOfDonation),
        bloodGroup: userData.bloodGroup,
        donationType: userData.donationType,
        availableForDonation: this.utility._availableForDonation(userData.dateOfDonation, userData.gender).availableForDonation,
        address: {
          city: userData.city,
          area: userData.area,
          state: userData.state,
          pincode: userData.pincode,
        }
      }
      console.log(data)
      // });

    });
    // this.utility._hideLoader();
  }

  _manuplateDate(dateofDonation) {
    let dateArrayDDMMYYYY = (dateofDonation).split("/")
    if (dateArrayDDMMYYYY[0] < 10 && dateArrayDDMMYYYY[0].length < 2)
      dateArrayDDMMYYYY[0] = '0' + dateArrayDDMMYYYY[0]
    if (dateArrayDDMMYYYY[1] < 10 && dateArrayDDMMYYYY[1].length < 2)
      dateArrayDDMMYYYY[1] = '0' + dateArrayDDMMYYYY[1]
    console.log(dateArrayDDMMYYYY)
    return (dateofDonation).split("/").reverse().join("-").concat("T00:00:00.000Z")
  }

}
