import { User, IUser } from '../domain/entities/User';
import { Email } from '../domain/value-objects/Email';
import { Password } from '../domain/value-objects/Password';

describe('User Entity', () => {
  const createValidUserProps = (overrides?: Partial<IUser>): IUser => ({
    id: '550e8400-e29b-41d4-a716-446655440000',
    email: new Email('test@example.com'),
    password: new Password('HashedPass1', true),
    completeName: 'Test User',
    timezone: 'UTC',
    locale: 'es',
    isActive: true,
    createdAt: new Date('2026-01-01'),
    updatedAt: new Date('2026-01-01'),
    ...overrides,
  });

  it('should create a user with valid properties', () => {
    const user = new User(createValidUserProps());

    expect(user.getId()).toBe('550e8400-e29b-41d4-a716-446655440000');
    expect(user.getEmail().getValue()).toBe('test@example.com');
    expect(user.getCompleteName()).toBe('Test User');
    expect(user.getTimezone()).toBe('UTC');
    expect(user.getLocale()).toBe('es');
    expect(user.isActive()).toBe(true);
  });

  it('should handle optional avatar and phone', () => {
    const user = new User(
      createValidUserProps({
        avatar: 'https://avatar.url/img.png',
        phone: '+51999888777',
      })
    );

    expect(user.getAvatar()).toBe('https://avatar.url/img.png');
    expect(user.getPhone()).toBe('+51999888777');
  });

  it('should return undefined for missing optional fields', () => {
    const user = new User(createValidUserProps());

    expect(user.getAvatar()).toBeUndefined();
    expect(user.getPhone()).toBeUndefined();
    expect(user.getLastLogin()).toBeUndefined();
  });

  it('should return createdAt and updatedAt dates', () => {
    const date = new Date('2026-01-15');
    const user = new User(
      createValidUserProps({ createdAt: date, updatedAt: date })
    );

    expect(user.getCreatedAt()).toEqual(date);
    expect(user.getUpdatedAt()).toEqual(date);
  });
});
