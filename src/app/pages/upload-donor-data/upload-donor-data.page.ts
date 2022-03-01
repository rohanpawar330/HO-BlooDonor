import { Component, OnInit } from '@angular/core';
import donorData from '../../../../uploadDonorDataToCloud/bloodDonorList.json';
import { DataService } from '../../services/data.service';
import { UserDetailsI } from '../../interface/interface';

@Component({
  selector: 'app-upload-donor-data',
  templateUrl: './upload-donor-data.page.html',
  styleUrls: ['./upload-donor-data.page.scss'],
})
export class UploadDonorDataPage implements OnInit {

  public countryList: UserDetailsI;

  constructor(private dataService: DataService) { }

  ngOnInit() {
  }

  uploadData() {
    donorData.forEach(userData => {
      this.dataService.addUser({
        firstName: userData.firstName,
        lastName: userData.lastName,
        mobileNo: userData.mobileNo,
        gender: userData.gender,
        age: userData.age,
        dateOfDonation: userData.dateOfDonation,
        bloodGroup: userData.bloodGroup,
        availableForDonation: userData.availableForDonation,
        address: {
          city: userData.city,
          area: userData.area,
          state: userData.state,
          pincode: userData.pincode,
        }
      });

    });
  }

}
