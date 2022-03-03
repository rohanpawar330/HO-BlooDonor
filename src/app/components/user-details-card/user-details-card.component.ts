import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-details-card',
  templateUrl: './user-details-card.component.html',
  styleUrls: ['./user-details-card.component.scss'],
})
export class UserDetailsCardComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

  data = [
    {
      "availableForDonation": "No",
      "gender": "Male",
      "age": 26,
      "lastName": "singh",
      "dateOfDonation": null,
      "bloodGroup": "O+",
      "address": {
        "city": "banaras",
        "pincode": 482005,
        "area": "Ranjhi",
        "state": "MP"
      },
      "mobileNo": 1919191919,
      "firstName": "Aman",
      "id": "C6B4JRYZtXMe6OFUx76j"
    },
    {
      "lastName": "pawar1",
      "gender": "male",
      "dateOFDonation": "12/12/12",
      "address": {
          "area": "ranjhi",
          "state": "mp",
          "pincode": "482005",
          "city": "jbp"
      },
      "firstName": "rohan1",
      "mobileNo": "9090909090",
      "bloodGroup": "A+",
      "availableForDonation": "yes",
      "dateOfDonation": "03/11/2021",
      "id": "CXdTgGeRz9ZNfsBceDhs"
  },
  {
      "address": {
          "city": "Jbp",
          "area": "Ranjhi",
          "pincode": 482005,
          "state": "MP"
      },
      "dateOfDonation": null,
      "age": 27,
      "mobileNo": 8787878787,
      "availableForDonation": "Yes",
      "firstName": "Kanni",
      "lastName": "kohli",
      "gender": "Female",
      "bloodGroup": "A+",
      "id": "E2p7WPUQwxOjvKin5lsg"
  },
  {
      "mobileNo": 1212121212,
      "dateOFDonation": "12/12/12",
      "lastName": "Shahreen",
      "age": 24,
      "address": {
          "pincode": 410101,
          "city": "Indore",
          "state": "MP",
          "area": "ABC"
      },
      "dateOfDonation": null,
      "gender": "Female",
      "bloodGroup": "O+",
      "firstName": "Shahreen12",
      "availableForDonation": "Yes",
      "id": "q1fRZBPdVIjxH3gWTYCj"
  }
  ]
}
