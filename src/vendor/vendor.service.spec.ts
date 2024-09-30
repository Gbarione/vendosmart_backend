import { Test, TestingModule } from "@nestjs/testing";
import { JobService } from "../job/job.service";
import { StorageService } from "../_core/local_storage";
import { CreateJobDto } from "../job/dto/create_job.dto";
import { NotFoundException } from "@nestjs/common";
import { VendorService } from "./vendor.service";
import { ServiceService } from "../service/service.service";
import { CreateVendorDto } from "./dto/create_vendor.dto";
import { Vendor } from "./vendor.entity";
import { Service } from "src/service/service.entity";
import { totalmem } from "os";

describe("VendorService", () => {
	let jobService: JobService;
	let service: VendorService;
	let storageService: StorageService;
	let serviceService: ServiceService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				JobService,
				VendorService,
				ServiceService,
				{
					provide: StorageService,
					useValue: {
						getInstance: jest.fn().mockReturnThis(),
						findById: jest.fn(),
						findAll: jest.fn(),
						create: jest.fn(),
						update: jest.fn(),
					},
				},
			],
		}).compile();

		jobService = module.get<JobService>(JobService);
		service = module.get<VendorService>(VendorService);
		storageService = module.get<StorageService>(StorageService);
		serviceService = module.get<ServiceService>(ServiceService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});

	describe("_getPotentialVendors", () => {
		it("should throw NotFoundException any entity is not found", () => {
			expect(() => service.getReachableVendors(999, 999)).toThrow(
				NotFoundException,
			);
		});
	});

	describe("create", () => {
		it("should throw NotFoundException when location is not found", () => {
			const createVendorDto: CreateVendorDto = {
				name: "Test Vendor",
				locationId: 999,
				services: [],
			};

			expect(() => service.create(createVendorDto)).toThrow(
				NotFoundException,
			);
		});

		it("should throw NotFoundException when category is not found", () => {
			const createVendorDto: CreateVendorDto = {
				name: "Test Vendor",
				locationId: 10,
				services: [{ categoryId: 999, compliant: false }],
			};

			expect(() => service.create(createVendorDto)).toThrow(
				NotFoundException,
			);
		});

		it("should create a vendor", () => {
			const createVendorDto: CreateVendorDto = {
				name: "Vendor 1",
				locationId: 10,
				services: [
					{ categoryId: 2, compliant: false },
					{ categoryId: 4, compliant: false },
				],
			};

			const result = service.create(createVendorDto);
			expect(result).toBeDefined();
		});
	});

	describe("getPotentialVendors", () => {
		it("should throw NotFoundException when job is not found", () => {
			expect(() => service.getPotentialVendors(999)).toThrow(
				NotFoundException,
			);
		});

		it("should get potential vendors", () => {
			const createJobDto: CreateJobDto = {
				locationId: 10,
				categoryId: 4,
			};

			const job = jobService.create(createJobDto);

			const result = service.getPotentialVendors(job.id);

			expect(result).toEqual([
				{
					id: 2,
					name: "Vendor 1",
					location: { id: 10, name: "Fayette", state: "TX" },
					services: [
						{
							id: 1,
							compliant: false,
							category: { id: 2, name: "Air Conditioning" },
						},
						{
							id: 2,
							compliant: false,
							category: {
								id: 4,
								name: "Landscaping Maintenance",
							},
						},
					],
				},
			]);
			expect(result).toBeDefined();
		});
	});

	describe("getReachableVendors", () => {
		it("should throw NotFoundException when location is not found", () => {
			expect(() => service.getReachableVendors(999, 4)).toThrow(
				NotFoundException,
			);
		});

		it("should throw NotFoundException when category is not found", () => {
			expect(() => service.getReachableVendors(10, 999)).toThrow(
				NotFoundException,
			);
		});

		it("should throw NotFoundException when no potential vendors are found", () => {
			const result = service.getReachableVendors(1, 1);

			expect(result).toEqual({
				total: 0,
				compliant: 0,
				notCompliant: 0,
			});
			expect(result).toBeDefined();
		});

		it("should get reachable vendors", () => {
			const result = service.getReachableVendors(10, 4);

			expect(result).toEqual({
				total: 1,
				compliant: 0,
				notCompliant: 1,
			});
			expect(result).toBeDefined();
		});
	});
});

