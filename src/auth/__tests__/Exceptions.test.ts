import { InvalidCredentialsException } from '../domain/exceptions/InvalidCredentialsException';
import { UserAlreadyExistsException } from '../domain/exceptions/UserAlreadyExistsException';

describe('Auth Domain Exceptions', () => {
  describe('InvalidCredentialsException', () => {
    it('should have correct message', () => {
      const exception = new InvalidCredentialsException();
      expect(exception.message).toBe('Invalid email or password');
    });

    it('should have correct name', () => {
      const exception = new InvalidCredentialsException();
      expect(exception.name).toBe('InvalidCredentialsException');
    });

    it('should be an instance of Error', () => {
      const exception = new InvalidCredentialsException();
      expect(exception).toBeInstanceOf(Error);
    });
  });

  describe('UserAlreadyExistsException', () => {
    it('should contain the email in the message', () => {
      const exception = new UserAlreadyExistsException('test@example.com');
      expect(exception.message).toBe(
        'User with email test@example.com already exists'
      );
    });

    it('should have correct name', () => {
      const exception = new UserAlreadyExistsException('test@example.com');
      expect(exception.name).toBe('UserAlreadyExistsException');
    });

    it('should be an instance of Error', () => {
      const exception = new UserAlreadyExistsException('test@example.com');
      expect(exception).toBeInstanceOf(Error);
    });
  });
});
