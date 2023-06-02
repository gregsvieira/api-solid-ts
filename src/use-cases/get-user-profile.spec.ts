import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { expect, test, describe, it, beforeEach } from 'vitest';
import { hash } from 'bcryptjs';
import { GetUserProfileUseCase } from './get-user-profile';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

let usersRepository: InMemoryUsersRepository;
let sut: GetUserProfileUseCase;

describe('Get User Profile Use Case', ()=> {
	beforeEach(()=> {
		usersRepository = new InMemoryUsersRepository();
		sut = new GetUserProfileUseCase(usersRepository);
	});

	it('Should be able to get user profile', async ()=> {
		const createdUser =await usersRepository.create({
			name: 'John Dee',
			email: 'johndee@email.com',
			password_hash: await hash('123456', 6)
		});

		const { user } = await sut.execute({
			userId: createdUser.id
		});
    
		expect(user.id).toEqual(expect.any(String));
		expect(user.name).toEqual('John Dee');

	});

	it('Should not be able to get user profile with wrong id', async ()=> {

		expect(()=> sut.execute({
			userId: 'non-existing-id'
		}),
		).rejects.toBeInstanceOf(ResourceNotFoundError);
    
	});
});