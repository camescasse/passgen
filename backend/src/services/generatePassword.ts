import { PasswordOptions } from '../models/passwordOptions';

const generatePassword = (options: PasswordOptions) => {
  const defaultOptions: Required<PasswordOptions> = {
    length: 8,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  };

  const config: Required<PasswordOptions> = { ...defaultOptions, ...options };

  const uppercaseChars: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercaseChars: string = 'abcdefghijklmnopqrstuvwxyz';
  const numberChars: string = '0123456789';
  const symbolChars: string = '!@#$%^&*()_+-=[]{};:,./<>?';

  let chars: string = '';

  if (config.uppercase) chars += uppercaseChars;
  if (config.lowercase) chars += lowercaseChars;
  if (config.numbers) chars += numberChars;
  if (config.symbols) chars += symbolChars;

  if (chars === '') {
    return '';
  }

  let password: string = '';
  for (let i: number = 0; i < config.length; i++) {
    const randomIndex: number = Math.floor(Math.random() * chars.length);
    password += chars[randomIndex];
  }

  return password;
};

export default generatePassword;
