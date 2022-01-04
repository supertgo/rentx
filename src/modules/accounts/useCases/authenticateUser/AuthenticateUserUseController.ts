/* eslint-disable no-useless-constructor */
import { compare } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';
import { sign } from 'jsonwebtoken';

import { AppError } from '@shared/errors/AppError';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Email or password incorrect');
    }

    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      throw new AppError('Email or password incorrect');
    }

    const token = sign({}, '5c7f3c3ff42b757076f11b2e90f83046', {
      subject: user.id,
      expiresIn: '1d'
    });

    const tokaneReturn: IResponse = {
      token,
      user: {
        name: user.name,
        email: user.email
      }
    };

    return tokaneReturn;
  }
}

export { AuthenticateUserUseCase };
