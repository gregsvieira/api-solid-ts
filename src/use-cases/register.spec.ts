import { expect, test, describe, it, beforeEach } from 'vitest';
import { RegisterUseCase } from './register';
import { compare } from 'bcryptjs';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { rejects } from 'assert';
import { UserAlreadyExistsError } from './errors/user-already-exists-error';

let usersRepository: InMemoryUsersRepository;
let sut: RegisterUseCase;

describe('Register Use Case', () => {
	beforeEach(()=> {
		usersRepository = new InMemoryUsersRepository();
		sut = new RegisterUseCase(usersRepository);
	});

	it('Should be to register', async ()=> {
		const { user } = await sut.execute({
			name: 'John Dee',
			email: 'johndee@email.com',
			password: '123456',
		});

		expect(user.id).toEqual(expect.any(String));
	});

	it('Should be hash user password upon registration', async ()=> {
		const { user } = await sut.execute({
			name: 'John Dee',
			email: 'johndee@email.com',
			password: '123456',
		});

		const isPasswordCorrectlyHashed = await compare('123456',
			user.password_hash
		);

		expect(isPasswordCorrectlyHashed).toBe(true);
	});

	it('Should not be able to register with same email twice', async () => {
		const email =	'johndee@email.com';

		await sut.execute({
			name: 'John Dee',
			email,
			password: '123456',
		});

		await expect(()=> 
			sut.execute({
				name: 'John Dee',
				email,
				password: '123456',
			})
		).rejects.toBeInstanceOf(UserAlreadyExistsError);

	});
});