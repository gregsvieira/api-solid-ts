import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { expect, test, afterEach, vi, describe, it, beforeEach } from 'vitest';
import { AuthenticateUseCase } from './authenticate';
import { hash } from 'bcryptjs';
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';
import { CheckInUseCase } from './check-in';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { Decimal } from '@prisma/client/runtime/library';

let checkInsRepository: InMemoryCheckInsRepository;
let gymsRepository: InMemoryGymsRepository;
let sut: CheckInUseCase;

describe('Check-in Use Case', ()=> {
	beforeEach(()=> {
		checkInsRepository = new InMemoryCheckInsRepository();
		gymsRepository = new InMemoryGymsRepository();
		sut = new CheckInUseCase(checkInsRepository, gymsRepository);

		gymsRepository.items.push({
			id: 'gym-01',
			title: 'Ts Gym',
			description: '',
			phone: '',
			latitude: new Decimal(-30.0087716),
			longitude: new Decimal(-51.1638477),
		});

		vi.useFakeTimers();
	});

	afterEach(()=> {
		vi.useRealTimers();
	});

	it('Should be able to check in', async ()=> {
		const { checkIn } = await sut.execute({
			gymId: 'gym-01',
			userId: 'user-01',
			userLatitude: -30.0087716,
			userLongitude: -51.1638477,
		});

		expect(checkIn.id).toEqual(expect.any(String));
	});

	it('Should not be able to check in twice in the same day', async ()=> {
		vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));


		await sut.execute({
			gymId: 'gym-01',
			userId: 'user-01',
			userLatitude: -30.0087716,
			userLongitude: -51.1638477,
		});

		await expect(()=> 
			sut.execute({
				gymId: 'gym-01',
				userId: 'user-01',
				userLatitude: -30.0087716,
				userLongitude: -51.1638477,
			})
		).rejects.toBeInstanceOf(Error);
	});

	it('Should be able to check in twice but in different days', async ()=> {
		vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));


		await sut.execute({
			gymId: 'gym-01',
			userId: 'user-01',
			userLatitude: -30.0087716,
			userLongitude: -51.1638477,
		});

		vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0));

		const { checkIn } = await sut.execute({
			gymId: 'gym-01',
			userId: 'user-01',
			userLatitude: -30.0087716,
			userLongitude: -51.1638477,
		});
    
		expect(checkIn.id).toEqual(expect.any(String));

	});

	it('Should not be able to check in twice but in different days', async ()=> {
		vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));


		await sut.execute({
			gymId: 'gym-01',
			userId: 'user-01',
			userLatitude: -30.0087716,
			userLongitude: -51.1638477,
		});

		vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0));

		const { checkIn } = await sut.execute({
			gymId: 'gym-01',
			userId: 'user-01',
			userLatitude: -30.0087716,
			userLongitude: -51.1638477,
		});
    
		expect(checkIn.id).toEqual(expect.any(String));
	});
	
	it('Should not be able to check in on distant gym', async ()=> {

		gymsRepository.items.push({
			id: 'gym-02',
			title: 'Training Gym',
			description: '',
			phone: '',
			latitude: new Decimal(-30.0157481),
			longitude: new Decimal(-51.1986748),
		});
		
		await expect(()=> 
			sut.execute({
				gymId: 'gym-02',
				userId: 'user-01',
				userLatitude: -30.0087716,
				userLongitude: -51.1638477,
			}),
		).rejects.toBeInstanceOf(Error);
	});
});
