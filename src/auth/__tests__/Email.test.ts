import { Email } from '../domain/value-objects/Email';

describe('Email Value Object', () => {
  // ── Tests válidos ──

  it('should create a valid email', () => {
    const email = new Email('user@example.com');
    expect(email.getValue()).toBe('user@example.com');
  });

  it('should lowercase the email', () => {
    const email = new Email('User@Example.COM');
    expect(email.getValue()).toBe('user@example.com');
  });

  it('should support subdomains', () => {
    const email = new Email('user@mail.example.com');
    expect(email.getValue()).toBe('user@mail.example.com');
  });

  // ── Tests de igualdad ──

  it('should return true for equal emails', () => {
    const email1 = new Email('user@example.com');
    const email2 = new Email('USER@example.com');
    expect(email1.equals(email2)).toBe(true);
  });

  it('should return false for different emails', () => {
    const email1 = new Email('user1@example.com');
    const email2 = new Email('user2@example.com');
    expect(email1.equals(email2)).toBe(false);
  });

  // ── Tests de toString ──

  it('toString should return the email value', () => {
    const email = new Email('user@example.com');
    expect(email.toString()).toBe('user@example.com');
  });

  // ── Tests inválidos ──

  it('should throw error for empty email', () => {
    expect(() => new Email('')).toThrow('Email cannot be empty');
  });

  it('should throw error for whitespace-only email', () => {
    expect(() => new Email('   ')).toThrow('Email cannot be empty');
  });

  it('should throw error for invalid email format (no @)', () => {
    expect(() => new Email('userexample.com')).toThrow('Invalid email format');
  });

  it('should throw error for invalid email format (no domain)', () => {
    expect(() => new Email('user@')).toThrow('Invalid email format');
  });

  it('should throw error for invalid email format (no local part)', () => {
    expect(() => new Email('@example.com')).toThrow('Invalid email format');
  });

  it('should throw error for email exceeding 255 characters', () => {
    const longLocal = 'a'.repeat(250);
    const longEmail = `${longLocal}@example.com`;
    expect(() => new Email(longEmail)).toThrow('Email is too long');
  });
});
