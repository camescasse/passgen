import { describe, expect, it } from 'vitest';
import { PasswordOptions } from '../../models/passwordOptions';
import generatePassword from '../../services/generatePassword';

describe('generatePassword service', () => {
  let options: PasswordOptions = {};

  it('should return an empty string given a length of 0 and all options enabled', () => {
    options.length = 0;
    options.uppercase = true;
    options.lowercase = true;
    options.numbers = true;
    options.symbols = true;

    const password = generatePassword(options);

    expect(password).toBe('');
  });

  it('should return an empty string given a length of more than 0 and all options disabled', () => {
    options.length = 1;
    options.uppercase = false;
    options.lowercase = false;
    options.numbers = false;
    options.symbols = false;

    const password = generatePassword(options);

    expect(password).toBe('');
  });

  it('should return a password given a length of more than 0 and any option enabled', () => {
    options.length = Math.floor(Math.random() * 50);
    options.uppercase = true;
    options.lowercase = true;
    options.numbers = true;
    options.symbols = true;

    const password = generatePassword(options);

    expect(password).toHaveLength(options.length);
  });
});
