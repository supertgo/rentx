/* eslint-disable no-useless-constructor */
/* eslint-disable camelcase */
import { inject, injectable } from 'tsyringe';
import { hash } from 'bcryptjs';
import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { AppError } from '@shared/errors/AppError';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    name,
    email,
    password,
    driver_license
  }: ICreateUserDTO): Promise<void> {
    const userAlreadyExisits = await this.usersRepository.findByEmail(email);

    if (userAlreadyExisits) {
      throw new AppError('User already exists!');
    }
    const passwordHash = await hash(password, 8);

    await this.usersRepository.create({
      name,
      email,
      password: passwordHash,
      driver_license
    });
  }
}

export { CreateUserUseCase };
