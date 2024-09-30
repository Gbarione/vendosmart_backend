import { Test, TestingModule } from "@nestjs/testing";
import { ServiceService } from "./service.service";
import { StorageService } from "../_core/local_storage";
import { CreateServiceDto } from "./dto/create_service.dto";
import { NotFoundException } from "@nestjs/common";

describe("ServiceService", () => {
	let service: ServiceService;
	let storageService: StorageService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				ServiceService,
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

		service = module.get<ServiceService>(ServiceService);
		storageService = module.get<StorageService>(StorageService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});

	it("should create a service", () => {
		const createServiceDto: CreateServiceDto = {
			compliant: true,
			categoryId: 1,
		};
		const vendorId = 1;

		const result = service.create(vendorId, createServiceDto);
		expect(result).toBeDefined();
	});

	it("should throw NotFoundException if category not found", () => {
		const createServiceDto: CreateServiceDto = {
			compliant: true,
			categoryId: 999,
		};
		const vendorId = 1;

		expect(() => {
			service.create(vendorId, createServiceDto);
		}).toThrow(NotFoundException);
	});
});

