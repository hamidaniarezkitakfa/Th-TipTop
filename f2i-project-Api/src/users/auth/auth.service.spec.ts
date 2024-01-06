import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../entities/user.entity';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt', () => ({
  compare: jest.fn(),
  genSalt: jest.fn().mockResolvedValue('someSalt'),
  hash: jest.fn().mockResolvedValue('hashedPassword'),
}));

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: Partial<UsersService>;
  let jwtService: Partial<JwtService>;

  beforeEach(async () => {
    // Mock UsersService and JwtService
    usersService = {
      findOneByEmail: jest.fn(),
      create: jest.fn(),
    };
    jwtService = {
      signAsync: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: usersService },
        { provide: JwtService, useValue: jwtService },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('should successfully register a new user', async () => {
    const userDto = {
      username: 'testuser',
      email: 'test@example.com',
      password: 'password',
      isAdmin: true,
      isWorker: false,
    };
    (usersService.findOneByEmail as jest.Mock).mockResolvedValue(null);
    (usersService.create as jest.Mock).mockResolvedValue(userDto);

    await expect(authService.register(userDto)).resolves.toEqual(userDto);
  });

  it('should throw an error if user tries to register with an existing email', async () => {
    const userDto = {
      username: 'testuser',
      email: 'test@example.com',
      password: 'password',
      isAdmin: true,
      isWorker: false,
    };
    (usersService.findOneByEmail as jest.Mock).mockResolvedValue(userDto);

    await expect(authService.register(userDto)).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('should successfully login with valid credentials', async () => {
    const user = {
      id: 1,
      isAdmin: false,
      email: 'test@example.com',
      password: 'hashedPassword',
    };
    (usersService.findOneByEmail as jest.Mock).mockResolvedValue(user);
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    (jwtService.signAsync as jest.Mock).mockResolvedValue('jwtToken');

    await expect(
      authService.login({ email: 'test@example.com', password: 'password' }),
    ).resolves.toEqual('jwtToken');
  });

  it('should throw an error if user tries to login with an invalid email', async () => {
    (usersService.findOneByEmail as jest.Mock).mockResolvedValue(null);

    await expect(
      authService.login({ email: 'test@example.com', password: 'password' }),
    ).rejects.toThrow(NotFoundException);
  });

  it('should throw an error if user tries to login with incorrect password', async () => {
    const user = { email: 'test@example.com', password: 'hashedPassword' };
    (usersService.findOneByEmail as jest.Mock).mockResolvedValue(user);
    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    await expect(
      authService.login({
        email: 'test@example.com',
        password: 'wrongPassword',
      }),
    ).rejects.toThrow(UnauthorizedException);
  });

  // it('should successfully create a new user with Google login', async () => {
  //   const googleUserDto = {
  //     email: 'new@example.com',
  //     username: 'newUser',
  //     image: 'imageURL',
  //   };
  //   (usersService.findOneByEmail as jest.Mock).mockResolvedValue(null);
  //   (usersService.create as jest.Mock).mockResolvedValue(googleUserDto);

  //   await expect(authService.googleLogin(googleUserDto)).resolves.toEqual(
  //     googleUserDto,
  //   );
  // });

  // it('should throw an error if Google login is attempted with an existing email', async () => {
  //   const googleUserDto = {
  //     email: 'existing@example.com',
  //     username: 'existingUser',
  //     image: 'imageURL',
  //   };
  //   (usersService.findOneByEmail as jest.Mock).mockResolvedValue(googleUserDto);

  //   await expect(authService.googleLogin(googleUserDto)).rejects.toThrow(
  //     NotFoundException,
  //   );
  // });
});
