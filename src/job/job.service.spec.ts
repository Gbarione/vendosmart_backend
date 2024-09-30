import { Test, TestingModule } from "@nestjs/testing";
import { JobService } from "./job.service";
import { StorageService } from "../_core/local_storage";
import { CreateJobDto } from "./dto/create_job.dto";
import { NotFoundException } from "@nestjs/common";

describe("JobService", () => {
	let service: JobService;
	let storageService: StorageService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				JobService,
				{
					provide: StorageService,
					useValue: {
						getInstance: jest.fn().mockReturnThis(),
						findById: jest.fn(),
						create: jest.fn(),
					},
				},
			],
		}).compile();

		service = module.get<JobService>(JobService);
		storageService = module.get<StorageService>(StorageService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});

	it("should create a service", () => {
		const createJobDto: CreateJobDto = {
			locationId: 1,
			categoryId: 1,
		};

		const result = service.create(createJobDto);

		expect(result).toBeDefined();
	});

	it("should throw NotFoundException if category or location not found", () => {
		const createJobDto: CreateJobDto = {
			locationId: 1,
			categoryId: 999,
		};

		expect(() => {
			service.create(createJobDto);
		}).toThrow(NotFoundException);
	});
});

