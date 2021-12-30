import { AppError } from '@shared/errors/AppError';
import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseController';

const user: ICreateUserDTO = {
  driver_license: '001234',
  email: 'user@test.com',
  password: '1234',
  name: 'User Test'
};

describe('Authenticate User', () => {
  let authenticateUserUseCase: AuthenticateUserUseCase;
  let usersRepositoryInMemory: UsersRepositoryInMemory;
  let createUserUseCase: CreateUserUseCase;

  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory
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
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: 'false@email.com',
        password: 'wrongpassword'
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to authenticate an user with wrong email', async () => {
    expect(async () => {
      await createUserUseCase.execute(user);
      await authenticateUserUseCase.execute({
        email: 'wrong@email.com',
        password: user.password
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to authenticate an user with wrong password', async () => {
    expect(async () => {
      await createUserUseCase.execute(user);
      await authenticateUserUseCase.execute({
        email: user.email,
        password: 'wrong password'
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
