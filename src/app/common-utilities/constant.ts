export const gender = {
    male: "Male",
    female: "Female"
}

export const totalDayDonation = {
    blood: {
        maleDay: 90,
        femaleDay: 120
    },
    platelets: {
        maleDay: 30,
        femaleDay: 40
    },
    plasma: {
        maleDay: 10,
        femaleDay: 20
    },
}

export const userDetailInput = [
    {
        name: 'firstName',
        placeholder: 'firstName',
        type: 'text'
    },
    {
        name: 'lastName',
        placeholder: 'lastName',
        type: 'text'
    },
    {
        name: 'gender',
        placeholder: 'gender',
        type: 'text'
    },
    {
        name: 'mobileNo',
        placeholder: 'mobileNo',
        type: 'text'
    },
    {
        name: 'age',
        placeholder: 'age',
        type: 'text'
    },
    {
        name: 'dateOfDonation',
        placeholder: 'dateOfDonation',
        type: 'text'
    },
    {
        name: 'bloodGroup',
        placeholder: 'bloodGroup',
        type: 'text'
    },
    {
        name: 'availableForDonation',
        placeholder: 'availableForDonation',
        type: 'text'
    },
    {
        name: 'city',
        placeholder: 'city',
        type: 'text'
    },
    {
        name: 'area',
        placeholder: 'area',
        type: 'text'
    },
    {
        name: 'state',
        placeholder: 'state',
        type: 'text'
    }
]

export const USER_DETAIL = {
    firstName: '',
    lastName: '',
    gender: '',
    mobileNo: null,
    age: null,
    dateOfDonation: null,
    bloodGroup: '',
    donationType: '',
    availableForDonation: null,
    address: {
        city: '',
        area: '',
        state: '',
    }
};

export const BLOOD_GROUP =
    [
        { bG: 'A+', isChecked: false },
        { bG: 'A-', isChecked: false },
        { bG: 'B+', isChecked: false },
        { bG: 'B-', isChecked: false },
        { bG: 'O+', isChecked: false },
        { bG: 'O-', isChecked: false },
        { bG: 'AB+', isChecked: false },
        { bG: 'AB-', isChecked: false }
    ];

export const DONATION_TYPE = {
    blood: "Blood",
    platelets: "Platelets",
    plasma: "Plasma"
}
