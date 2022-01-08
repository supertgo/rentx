import { inject, injectable } from 'tsyringe';
import { v4 as uuidV4 } from 'uuid';

import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { AppError } from '@shared/errors/AppError';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';

@injectable()
export class SendForgotPasswordMailUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider
  ) {}

  async execute(email: string) {
    const EXPIRES_DATE_LIMIT = 3;
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('This user doest not exist!');
    }

    const token = uuidV4();
    const expires_date = this.dateProvider.addHours(EXPIRES_DATE_LIMIT);

    await this.usersTokensRepository.create({
      expires_date,
      user_id: user.id,
      refresh_token: token
    });
  }
}
