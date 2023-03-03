import { FormType } from '../lib/types';

const checkInput = (validate: string) => !validate || validate.trim() === '';

const testInput = (reg: RegExp, validate: string) => !reg.test(validate);

const checkLength = (validate: string, num: number = 1000) =>
  validate.length > num;

export const validate = ({ name, age, details, phone, email }: FormType) => {
  const errors: {
    name?: string;
    age?: string;
    phone?: string;
    email?: string;
    details?: string;
  } = {};
  if (checkInput(name)) errors.name = 'Name is required';

  if (checkInput(age)) {
    errors.age = 'Age is required';
  } else if (testInput(/^[1-9]?[0-9]{1}$|^100$/, age)) {
    errors.age = 'Invalid Age';
  }

  if (checkInput(phone)) {
    errors.phone = 'Phone number is required';
  } else if (
    testInput(
      /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/im,
      phone
    )
  ) {
    errors.phone = 'Invalid phone number';
  }

  if (checkInput(email)) {
    errors.email = 'Email is required';
  } else if (testInput(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, email)) {
    errors.email = 'Invalid email address';
  }

  if (checkLength(details)) {
    errors.details = "Your details can't be more than 1000 characters";
  }

  return errors;
};
