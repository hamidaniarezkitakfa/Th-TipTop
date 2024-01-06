import { Test, TestingModule } from '@nestjs/testing';
import { JeuxController } from './jeux.controller';
import { JeuxService } from './jeux.service';
import { User } from '../users/entities/user.entity';
import { CreateJeuxDto } from './dto/create-jeux.dto';
import { JwtAuthGuard } from '../users/guards/auth-guard';
import { JwtService } from '@nestjs/jwt';

// Mock Data for CreateJeuxDto
const mockCreateJeuxDto = {
  dateDebut: new Date('2023-01-01'),
  dateFin: new Date('2023-12-31'),
  nombreDeTicketTotal: 1000,
  grandLots: 'your wining',
  description: 'Test Description',
  jeuxDetails: [
    {
      id: 1,
      nomPrix: 'Prix Name 1',
      typePrix: 'Type of Prix 1',
      valeurPrix: 500,
      nombreTicket: 600,
    },
    {
      id: 2,
      nomPrix: 'Prix Name 2',
      typePrix: 'Type of Prix 2',
      valeurPrix: 1000,
      nombreTicket: 400,
    },
  ],
};

// Mock Data for UpdateJeuxDto
const mockUpdateJeuxDto = {
  // Populate with properties of UpdateJeuxDto
};

const mockJwtService = {
  sign: jest.fn(),
  login: jest.fn(),
};

jest.mock('../users/guards/auth-guard', () => {
  return {
    JwtAuthGuard: jest.fn().mockImplementation(() => ({
      canActivate: jest.fn().mockReturnValue(true),
    })),
  };
});

describe('JeuxController', () => {
  let controller: JeuxController;
  let jeuxService: Partial<JeuxService>;
  let mockUser: User;

  beforeEach(async () => {
    mockUser = new User();
    jeuxService = {
      create: jest
        .fn()
        .mockImplementation((dto, user) => Promise.resolve({ ...dto, id: 1 })),
      findAll: jest.fn(),
      tirage: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [JeuxController],
      providers: [
        { provide: JeuxService, useValue: jeuxService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    controller = module.get<JeuxController>(JeuxController);
  });

  it('should call create method with expected params', async () => {
    await controller.create(mockCreateJeuxDto, mockUser);
    expect(jeuxService.create).toHaveBeenCalledWith(
      mockCreateJeuxDto,
      mockUser,
    );
  });

  it('should call findAll method with current user', async () => {
    await controller.findAll(mockUser);
    expect(jeuxService.findAll).toHaveBeenCalledWith(mockUser);
  });

  it('should call tirage method with current user', async () => {
    await controller.tirage(mockUser);
    expect(jeuxService.tirage).toHaveBeenCalledWith(mockUser);
  });

  it('should call findOne method with id and current user', async () => {
    const id = 1;
    await controller.findOne(id, mockUser);
    expect(jeuxService.findOne).toHaveBeenCalledWith(id, mockUser);
  });

  it('should call update method with id, updateJeuxDto, and current user', async () => {
    const id = '1';
    await controller.update(id, mockUpdateJeuxDto, mockUser);
    expect(jeuxService.update).toHaveBeenCalledWith(
      +id,
      mockUpdateJeuxDto,
      mockUser,
    );
  });

  it('should call remove method with id and current user', async () => {
    const id = '1';
    await controller.remove(id, mockUser);
    expect(jeuxService.remove).toHaveBeenCalledWith(+id, mockUser);
  });
});
