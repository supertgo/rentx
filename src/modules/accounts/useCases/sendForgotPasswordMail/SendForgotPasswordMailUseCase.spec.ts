import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { UsersTokensRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { MailProviderInMemory } from '@shared/container/providers/MailProvider/in-memory/MailProviderInMemory';
import { AppError } from '@shared/errors/AppError';
import { SendForgotPasswordMailUseCase } from './SendForgotPasswordMailUseCase';

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let mailProvider: MailProviderInMemory;

describe('Send Forgot Mail', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    mailProvider = new MailProviderInMemory();

    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider
    );
  });
  it('should be able to send a forgot password to user', async () => {
    const sendMail = jest.spyOn(mailProvider, 'sendMail');

    await usersRepositoryInMemory.create({
      driver_license: '664168',
      email: 'testemail@gmail.com.dev',
      name: 'Rogerio Tobias',
      password: '1234'
    });

    await sendForgotPasswordMailUseCase.execute('testemail@gmail.com.dev');

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to send an email if user doest no extis', async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute('chouriço')
    ).rejects.toEqual(new AppError('This user doest not exist!'));
  });

  it('should be able to create an user token', async () => {
    const generateTokenMail = jest.spyOn(
      usersTokensRepositoryInMemory,
      'create'
    );

    await usersRepositoryInMemory.create({
      driver_license: '664168',
      email: 'testeemail@gmail.com.dev',
      name: 'Rogerio Toto ',
      password: '1234'
    });

    await sendForgotPasswordMailUseCase.execute('testeemail@gmail.com.dev');

    expect(generateTokenMail).toBeCalled();
  });
});
