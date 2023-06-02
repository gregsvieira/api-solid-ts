import { expect, test, describe, it, beforeEach } from 'vitest';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { CreateGymUseCase } from './create-gym';
import { Decimal } from '@prisma/client/runtime/library';

let gymsRepository: InMemoryGymsRepository;
let sut: CreateGymUseCase;

describe('Create Gym Use Case', () => {
	beforeEach(()=> {
		gymsRepository = new InMemoryGymsRepository();
		sut = new CreateGymUseCase(gymsRepository);
	});

	it('Should be to create gym', async ()=> {
		const { gym } = await sut.execute({
			title: 'NerdGym',
			description: 'No brain no gain',
			phone: '51-34875961',
			latitude: -30.0087716,
			longitude: -51.1638477
		});

		expect(gym.id).toEqual(expect.any(String));
	});
});