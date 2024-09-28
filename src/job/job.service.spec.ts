import { Test, TestingModule } from "@nestjs/testing";
import { JobService } from "./job.service";
import { StorageService } from "../_core/localStorage";
import { NotFoundException } from "@nestjs/common";

describe("JobService", () => {
	let service: JobService;
	let storageService: StorageService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [JobService, StorageService],
		}).compile();

		service = module.get<JobService>(JobService);
		storageService = module.get<StorageService>(StorageService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});

	describe("create", () => {
		it("should create a job when category and location exist", async () => {
			const createJobDto = { categoryId: 1, locationId: 1 };
			jest.spyOn(storageService, "findById").mockImplementation(
				(entity, id) => ({ id }),
			);
			jest.spyOn(storageService, "create").mockReturnValue({
				id: 1,
				...createJobDto,
			});

			const result = await service.create(createJobDto);

			expect(result).toEqual({ id: 1, ...createJobDto });
			expect(storageService.findById).toHaveBeenCalledTimes(2);
			expect(storageService.create).toHaveBeenCalledWith(
				"job",
				createJobDto,
			);
		});

		it("should throw NotFoundException when category or location not found", async () => {
			const createJobDto = { categoryId: 1, locationId: 1 };
			jest.spyOn(storageService, "findById").mockReturnValue(null);

			await expect(service.create(createJobDto)).rejects.toThrow(
				NotFoundException,
			);
		});
	});
});
