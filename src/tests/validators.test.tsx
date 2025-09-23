import { validateEmail } from '../utils/validators';

describe('validateEmail', () => {
  it('should return true for valid email addresses', () => {
    expect(validateEmail('test@example.com')).toBe(true);
    expect(validateEmail('user.name@domain.co.uk')).toBe(true);
    expect(validateEmail('test+tag@example.org')).toBe(true);
    expect(validateEmail('a@b.c')).toBe(true);
  });

  it('should return false for invalid email addresses', () => {
    expect(validateEmail('')).toBe(false);
    expect(validateEmail('invalid')).toBe(false);
    expect(validateEmail('@example.com')).toBe(false);
    expect(validateEmail('test@')).toBe(false);
    expect(validateEmail('test.example.com')).toBe(false);
    expect(validateEmail('test@example')).toBe(false);
    expect(validateEmail('test@example.')).toBe(false);
  });

  it('should return false for emails that are too long', () => {
    const longEmail = 'a'.repeat(250) + '@example.com';
    expect(validateEmail(longEmail)).toBe(false);
  });

  it('should return false for emails with multiple @ symbols', () => {
    expect(validateEmail('test@example@com')).toBe(false);
  });

  it('should return false for emails with @ at the beginning or end', () => {
    expect(validateEmail('@test.com')).toBe(false);
    expect(validateEmail('test.com@')).toBe(false);
  });

  it('should return false for emails without domain extension', () => {
    expect(validateEmail('test@example')).toBe(false);
  });

  it('should return false for emails with domain ending in dot', () => {
    expect(validateEmail('test@example.')).toBe(false);
  });
});
