export const governmentRecordsDataTypeList = [
  {
    id: 1,
    title: 'Driving License',
    type: 'DriverLicense',
    icon: require('../../assets/png-images/Driving-License-Icon/driving-license.png'),
  },
  {
    id: 2,
    title: 'Passport',
    type: 'Passport',
    icon: require('../../assets/png-images/Passport-Icon/passport.png'),
  },
  {
    id: 3,
    title: 'Tax & SSN',
    type: 'TaxIdentification',
    icon: require('../../assets/png-images/Tax-SSN-Icon/tax.png'),
  },
  {
    id: 4,
    title: `ID's`,
    type: 'IdentificationCards',
    icon: require('../../assets/png-images/Identification-Icon/identification.png'),
  },
];

export const getDataAsType = [
  'DriverLicense',
  'Passport',
  'TaxIdentification',
  'IdentificationCards',
];
