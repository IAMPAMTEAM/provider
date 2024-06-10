import { validationRegex } from '@/utils/validation/data';

export const validateUsername = (username: string): boolean => {
  const regExp = new RegExp(validationRegex.username);
  return regExp.test(username);
};

export const validatePassword = (password: string): boolean => {
  const regExp = new RegExp(validationRegex.password);
  return regExp.test(password);
};

export const validateEmail = (email: string): boolean => {
  const regExp = new RegExp(validationRegex.email);
  return regExp.test(email);
};
