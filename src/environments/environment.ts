// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyCZWRy1XWBcp0IWfreK5BtOKVDjIif3TXQ",
    authDomain: "ho-bloodonor.firebaseapp.com",
    projectId: "ho-bloodonor",
    storageBucket: "ho-bloodonor.appspot.com",
    messagingSenderId: "1000437726757",
    appId: "1:1000437726757:web:891cda68e0a29ee9d409cc",
    measurementId: "G-2CSSNGFLZB"
  }
};


// 1. url for free convertion of excel to json
// https://products.aspose.app/cells/conversion/excel-to-json
// 2. then move the json file to uploadDonorDataToCloud/ folder > with name bloodDonorList.json
//  in this remove the other data from it
// 3. excel file for reference to get data in excel format that will be uploaded to db 
//  uploadDonorDataToCloud/ folder > with name bloodDonorList.xlsx
// 4 . https://stackblitz.com/edit/angular-reactive-form-with-nested-fields-and-validations-vzqaiy  from control
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
