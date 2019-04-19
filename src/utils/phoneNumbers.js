import { ValidationError } from './errors';

const phoneNumberRegex1 = /(\+\d+)(?:[- .])?(\d\d\d)(?:[- .])?(\d\d\d)(?:[- .])?(\d\d\d\d)/;
const phoneNumberRegex2 = /(\d\d\d)(?:[- .])?(\d\d\d)(?:[- .])?(\d\d\d\d)/;

const parsePhoneNumber = value => {
  if (!value) {
    return value;
  }

  if (phoneNumberRegex1.test(value)) {
    return value.replace(phoneNumberRegex1, '$1$2$3$4');
  }

  if (phoneNumberRegex2.test(value)) {
    return value.replace(phoneNumberRegex2, '+1$1$2$3');
  }

  throw new ValidationError('Invalid phone number format', 400);
};

export default parsePhoneNumber;
