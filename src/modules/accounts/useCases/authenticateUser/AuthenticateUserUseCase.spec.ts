import { AppError } from '@shared/errors/AppError';
import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { UsersTokensRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory';
import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

const user: ICreateUserDTO = {
  driver_license: '001234',
  email: 'user@test.com',
  password: '1234',
  name: 'User Test'
};

describe('Authenticate User', () => {
  let authenticateUserUseCase: AuthenticateUserUseCase;
  let usersRepositoryInMemory: UsersRepositoryInMemory;
  let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
  let dateProvider: DayjsDateProvider;
  let createUserUseCase: CreateUserUseCase;

  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dateProvider = new DayjsDateProvider();

    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider
    );
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it('should be able to authenticate an user', async () => {
    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password
    });

    expect(result).toHaveProperty('token');
  });

  it('should not be able to authenticate an unexist user', async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: 'false@email.com',
        password: 'wrongpassword'
      })
    ).rejects.toEqual(new AppError('Email or password incorrect'));
  });

  it('should be able to authenticate an user with wrong email', async () => {
    await createUserUseCase.execute(user);
    await expect(
      authenticateUserUseCase.execute({
        email: 'wrong@email.com',
        password: user.password
      })
    ).rejects.toEqual(new AppError('Email or password incorrect'));
  });

  it('should be able to authenticate an user with wrong password', async () => {
    await createUserUseCase.execute(user);
    await expect(
      authenticateUserUseCase.execute({
        email: user.email,
        password: 'wrong password'
      })
    ).rejects.toEqual(new AppError('Email or password incorrect'));
  });
});
