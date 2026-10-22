import { randomInt } from 'node:crypto';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { PasswordOptions } from '../../models/passwordOptions';
import generatePassword from '../../services/generatePassword';

vi.mock('node:crypto', async (importOriginal) => {
  const actual = await importOriginal<typeof import('node:crypto')>();
  return { ...actual, randomInt: vi.fn(actual.randomInt) };
});

describe('generatePassword service', () => {
  let options: PasswordOptions = {};

  afterEach(() => {
    vi.clearAllMocks();
  });

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

  it('should return only characters from the enabled options', () => {
    options.length = 40;
    options.uppercase = false;
    options.lowercase = false;
    options.numbers = true;
    options.symbols = false;

    const password = generatePassword(options);

    expect(password).toMatch(/^[0-9]{40}$/);
  });

  it('should use crypto randomInt to select each character', () => {
    options.length = 16;
    options.uppercase = false;
    options.lowercase = false;
    options.numbers = true;
    options.symbols = false;

    generatePassword(options);

    expect(randomInt).toHaveBeenCalledTimes(16);
    expect(randomInt).toHaveBeenCalledWith(10);
  });
});
