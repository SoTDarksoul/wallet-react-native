import { StrKey } from './strkey';
import { PhoneNumberUtil } from 'google-libphonenumber';
import { Buffer } from 'buffer';
global.Buffer = Buffer;
// import WAValidator from 'wallet-address-validator';

export const IsEmail = email => {
  // let reg = /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (reg.test(email)) {
    return true;
  }
  return false;
};

export const validateEmail = email => {
  if (!IsEmail(email)) {
    return 'Please enter a valid email address';
  }
  return '';
};

export const validatePassword = password => {
  if (password.length < 8) {
    return 'Password must be at least 8 characters in length';
  }
  return '';
};

export const validateMobile = mobile => {
  const phoneUtil = PhoneNumberUtil.getInstance();
  // if number does not contain +27 TODO:
  const countryCode = mobile.includes('+') ? '' : 'US';
  const number = phoneUtil.parse(mobile, countryCode);
  let resp = phoneUtil.isPossibleNumber(number);
  if (!resp) {
    return 'Please enter a valid mobile number';
  }
  return '';
};
// export const validateMobile = mobile =>
//   new Promise((resolve, reject) => {
//     console.log('mobile', mobile);
//     let resp = PhoneNumberUtil.isPossibleNumber(mobile);
//     console.log('resp', resp);
//     if (!mobile && !PhoneNumberUtil.isPossibleNumber(mobile)) {
//       console.log('rejected');
//       reject('Please enter a valid mobile number');
//     }
//     resolve('');
//   });

export const validateCrypto = (address, type) => {
  if (address) {
    switch (type) {
      case 'stellar':
        if (StrKey.isValidEd25519PublicKey(address) || address.includes('*')) {
          return '';
        }
        break;
      case 'bitcoin':
      case 'ethereum':
        // if (WAValidator.validate(address, type, 'both')) {
        return '';
        // }
        break;
    }
  }
  return 'Please enter a valid ' + type + ' address';
};
