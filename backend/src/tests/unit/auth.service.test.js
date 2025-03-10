// src/tests/unit/auth.service.test.js
const { register } = require('../../services/auth.service');


const bcrypt = require('bcrypt'); // loading
jest.mock('bcrypt'); // Mocking


describe('Auth Service - register', () => {
  const prismaMock = {
    user: {
      create: jest.fn(),
    }
  }
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
  });

  it('should hash the password before saving new user', async() => {
    // Arrange
    const mockUser = { id: '1', email: 'test@example.com', password: 'hashedPassword' };
    bcrypt.hash.mockResolvedValue('hashedPassword'); // hashing, // Mock the success case
    prismaMock.user.create.mockResolvedValue(mockUser); // Mock the success case

    // Act
    const result = await register('test@example.com', 'password123', prismaMock);

    // Assert
    expect(bcrypt.hash).toHaveBeenCalledWith('password123', 12);
    expect(prismaMock.user.create).toHaveBeenCalledWith({
      data: {
        email: 'test@example.com',
        password: 'hashedPassword'
      }
    });
    expect(result).toEqual(mockUser);
  });

  it('should throw an error if registration fails', async () => {
    // Arrange

    prismaMock.user.create.mockRejectedValue(new Error('DataBase Error')); // Mock the failure case

    // Act & Assert
    await expect(register('test@example.com', 'password123', prismaMock)).rejects.toThrow('DataBase Error');
  });
});