import { Password } from '../domain/value-objects/Password';

describe('Password Value Object', () => {
  // ── Tests válidos ──

  it('should create a valid password', () => {
    const password = new Password('Secure1234');
    expect(password.getValue()).toBe('Secure1234');
  });

  it('should accept a hashed password without validation', () => {
    const hash = '$2b$10$somehashedvalue';
    const password = new Password(hash, true);
    expect(password.getValue()).toBe(hash);
  });

  it('should accept password with special characters', () => {
    const password = new Password('Str0ng@Pass!');
    expect(password.getValue()).toBe('Str0ng@Pass!');
  });

  // ── Tests de toString ──

  it('toString should return the password value', () => {
    const password = new Password('Valid1Pass');
    expect(password.toString()).toBe('Valid1Pass');
  });

  // ── Tests inválidos ──

  it('should throw error for empty password', () => {
    expect(() => new Password('')).toThrow('Password cannot be empty');
  });

  it('should throw error for whitespace-only password', () => {
    expect(() => new Password('   ')).toThrow('Password cannot be empty');
  });

  it('should throw error for password shorter than 8 characters', () => {
    expect(() => new Password('Ab1')).toThrow(
      'Password must be at least 8 characters long'
    );
  });

  it('should throw error for password longer than 128 characters', () => {
    const longPassword = 'Aa1' + 'x'.repeat(130);
    expect(() => new Password(longPassword)).toThrow('Password is too long');
  });

  it('should throw error for password without uppercase letter', () => {
    expect(() => new Password('nouppercase1')).toThrow(
      'Password must contain at least one uppercase letter'
    );
  });

  it('should throw error for password without lowercase letter', () => {
    expect(() => new Password('NOLOWERCASE1')).toThrow(
      'Password must contain at least one lowercase letter'
    );
  });

  it('should throw error for password without a number', () => {
    expect(() => new Password('NoNumbersHere')).toThrow(
      'Password must contain at least one number'
    );
  });
});
