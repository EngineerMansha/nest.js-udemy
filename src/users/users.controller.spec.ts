import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserEntity } from './users.entity';
import { AuthService } from './auth.service';
describe('UsersController', () => {
  let controller: UsersController;
  let fakeUserService: Partial<UsersService>;
  let fakeAuthService: Partial<AuthService>;

  beforeEach(async () => {
    fakeUserService = {
      findOne1: (id: number) => {
        return Promise.resolve({
          id,
          email: 'admin@gmail.com',
          password: '123',
        } as UserEntity);
      },
      find: (email: string) => {
        return Promise.resolve([{ id: 1, email, password: 'test' }]);
      },
    };
    fakeAuthService = {
      signup: (email: string, password: string) => {
        return Promise.resolve({
          email: 'admin@gmail.com',
          password: '123',
        } as UserEntity);
      },
      signin: (email: string, password: string) => {
        return Promise.resolve({ id: 1, email, password } as UserEntity);
      },
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: fakeUserService,
        },
        {
          provide: AuthService,
          useValue: fakeAuthService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('find All User Test', async () => {
    const users = await controller.getAllUser('manshauaf@gmail.com');
    expect(users.length).toEqual(1);
    expect(users[0].email).toEqual('manshauaf@gmail.com');
  });
  it('find user with ID', async () => {
    const user = await controller.findOne('1');
    expect(user).toBeDefined();
  });
  it('Find User Throws an error if user with given id not found', async () => {
    // fakeUserService.findOne1 = () => null;
    try {
      await controller.findOne('1');
    } catch (err) {
      console.log(err);
    }
  });
  it('signin updates session object and return user', async () => {
    const session = { userId: -10 };
    const user = await controller.signin(
      {
        email: 'manshauaf@gmail.com',
        password: '123',
      },
      session,
    );
    expect(user.id).toEqual(1);
    expect(session.userId).toEqual(1);
  });
});
